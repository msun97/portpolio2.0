import bpy
import math
from mathutils import Vector

# ============================================================
# Retro CRT Monitor generator
# Blender 3.x / 4.x
# Run this script in Blender's Scripting workspace.
# It creates a beige 90s-style CRT monitor with a separate
# screen material and exports a web-friendly GLB.
# ============================================================

# ---------- clean ----------
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# ---------- materials ----------
def mat(name, color, roughness=0.5, metallic=0.0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return m

BODY = mat("CRT_Beige", (0.53, 0.50, 0.42), 0.72)
DARK = mat("CRT_Dark_Plastic", (0.10, 0.095, 0.085), 0.68)
SCREEN = mat("SCREEN_REPLACE_ME", (0.018, 0.025, 0.028), 0.28)
BUTTON = mat("Buttons", (0.38, 0.36, 0.30), 0.62)
LED = mat("Power_LED", (0.08, 0.8, 0.35), 0.25)
BASE = mat("Base", (0.44, 0.42, 0.36), 0.72)

def bevel(obj, amount=0.08, segments=3):
    mod = obj.modifiers.new("Soft CRT edges", 'BEVEL')
    mod.width = amount
    mod.segments = segments
    mod.limit_method = 'ANGLE'
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=mod.name)

def cube(name, loc, scale, material, bevel_amt=0.05):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel_amt:
        bevel(o, bevel_amt, 3)
    o.data.materials.append(material)
    return o

def uv_sphere(name, loc, scale, material):
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=24, ring_count=12, location=loc
    )
    o = bpy.context.object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o.data.materials.append(material)
    return o

# ---------- monitor body ----------
# Main chunky housing
body = cube(
    "CRT_MONITOR_BODY",
    (0, 0, 1.95),
    (2.65, 1.10, 2.05),
    BODY,
    0.24
)

# Front bezel / face
bezel_obj = cube(
    "CRT_FRONT_BEZEL",
    (0, -1.08, 2.12),
    (2.40, 0.16, 1.78),
    BODY,
    0.20
)

# Dark inner screen recess
recess = cube(
    "SCREEN_RECESS",
    (0, -1.255, 2.28),
    (1.92, 0.045, 1.38),
    DARK,
    0.22
)

# Actual screen surface -- intentionally separate object/material
screen = cube(
    "SCREEN_SURFACE__REPLACE_MATERIAL",
    (0, -1.31, 2.28),
    (1.76, 0.035, 1.22),
    SCREEN,
    0.26
)

# Slight glass highlight strip
glass = cube(
    "SCREEN_GLASS_HIGHLIGHT",
    (-0.55, -1.355, 2.90),
    (0.72, 0.012, 0.045),
    mat("Glass_Highlight", (0.22, 0.27, 0.28), 0.18),
    0.025
)

# ---------- controls ----------
control_panel = cube(
    "CONTROL_PANEL",
    (1.82, -1.30, 1.05),
    (0.40, 0.05, 0.48),
    DARK,
    0.09
)

for i, z in enumerate([1.35, 1.08, 0.82]):
    b = cube(
        f"BUTTON_{i+1}",
        (1.82, -1.39, z),
        (0.11, 0.045, 0.075),
        BUTTON,
        0.025
    )

# Power LED
led = cube(
    "POWER_LED",
    (1.82, -1.405, 0.63),
    (0.055, 0.018, 0.028),
    LED,
    0.012
)

# ---------- vents ----------
for row in range(3):
    for col in range(7):
        x = -1.55 + col * 0.28
        z = 0.72 + row * 0.15
        cube(
            f"VENT_{row}_{col}",
            (x, -1.25, z),
            (0.095, 0.025, 0.025),
            DARK,
            0.008
        )

# ---------- bottom lip ----------
cube(
    "BOTTOM_LIP",
    (0, -1.13, 0.48),
    (2.25, 0.12, 0.16),
    BODY,
    0.08
)

# ---------- stand ----------
neck = cube(
    "STAND_NECK",
    (0, 0.05, -0.15),
    (0.42, 0.48, 0.52),
    BASE,
    0.12
)

base = cube(
    "STAND_BASE",
    (0, 0.05, -0.62),
    (1.45, 0.82, 0.20),
    BASE,
    0.16
)

# ---------- back vents / details ----------
for i in range(8):
    x = -1.55 + i * 0.44
    cube(
        f"BACK_VENT_{i}",
        (x, 1.13, 2.75),
        (0.13, 0.035, 0.55),
        DARK,
        0.025
    )

# ---------- origin / collection ----------
# Parent all monitor parts to an empty so the whole monitor rotates as one.
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 1.2))
root = bpy.context.object
root.name = "CRT_MONITOR_ROOT"

for obj in list(bpy.context.scene.objects):
    if obj != root and obj.type == 'MESH':
        obj.parent = root

# ---------- smooth shading ----------
for obj in bpy.context.scene.objects:
    if obj.type == 'MESH':
        for p in obj.data.polygons:
            p.use_smooth = True
        # Weighted normals / auto smooth handled by bevel geometry.

# ---------- camera-friendly orientation ----------
root.rotation_euler = (math.radians(0), math.radians(0), math.radians(0))

# ---------- export GLB ----------
# Export selected hierarchy only.
bpy.ops.object.select_all(action='DESELECT')
root.select_set(True)
bpy.context.view_layer.objects.active = root

output = bpy.path.abspath("//retro_crt_monitor.glb")

bpy.ops.export_scene.gltf(
    filepath=output,
    export_format='GLB',
    use_selection=True,
    export_apply=True,
    export_materials='EXPORT',
    export_cameras=False,
    export_lights=False,
    export_yup=True
)

print("DONE:", output)
print("Screen material name:", SCREEN.name)
print("Replace the material on SCREEN_SURFACE__REPLACE_MATERIAL with your portfolio texture.")
