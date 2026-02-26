import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    tags: Array<string>;
    publicationDate: Time;
}
export type Time = bigint;
export interface Memory {
    id: bigint;
    title: string;
    description: string;
    imageUrl: string;
}
export interface Education {
    institution: string;
    graduationYear: string;
    degree: string;
}
export interface WorkExperience {
    endDate: string;
    description: string;
    company: string;
    position: string;
    startDate: string;
}
export interface StudyMaterial {
    id: bigint;
    title: string;
    content: string;
    subject: string;
    description: string;
}
export interface Resume {
    education: Array<Education>;
    workExperience: Array<WorkExperience>;
    summary: string;
    skills: Array<string>;
}
export interface Article {
    id: bigint;
    coverImageUrl?: string;
    title: string;
    content: string;
    publicationDate: Time;
}
export interface backendInterface {
    addMemory(title: string, description: string, imageUrl: string): Promise<Memory>;
    addStudyMaterial(title: string, subject: string, description: string, content: string): Promise<StudyMaterial>;
    createArticle(title: string, content: string, coverImageUrl: string | null): Promise<Article>;
    createBlogPost(title: string, content: string, tags: Array<string>): Promise<BlogPost>;
    getAllArticles(): Promise<Array<Article>>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllMemories(): Promise<Array<Memory>>;
    getAllStudyMaterials(): Promise<Array<StudyMaterial>>;
    getArticle(id: bigint): Promise<Article>;
    getBlogPost(id: bigint): Promise<BlogPost>;
    getResume(): Promise<Resume | null>;
    getStudyMaterialsBySubject(subject: string): Promise<Array<StudyMaterial>>;
    updateResume(newResume: Resume): Promise<void>;
}
