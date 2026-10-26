export interface Project {
    num: string;
    projectSubject: string;
    title: string;
    content: string;
    techStack: string[];
    siteLink?: string;
    gitLink?: string;
    pdfLink?: string;
    imgLink?: string;
    confidential?: boolean;
}
