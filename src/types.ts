export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    icon: string;
    color: string;
    achievements: string[];
    techStack: string[];
}

export interface Project {
    title: string;
    image: string;
    icon: string;
    description: string;
    tags: string[];
    demoLink: string;
    architectureDiagram?: string;
    caseStudyId?: string;
}

export interface Video {
    title: string;
    src: string;
    type: 'youtube' | 'drive' | 'other';
}

export interface Certificate {
    src: string;
    title: string;
    provider: string;
    category: string;
}
