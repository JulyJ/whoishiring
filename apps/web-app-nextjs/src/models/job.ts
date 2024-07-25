export type Job = {
    id: number;
    title: string;
    date: string;
    company: string;
    urls: string[];
    tags: string[];
    isRemote: boolean;
    hasFrontend: boolean;
    hasQa: boolean;
    location: string;
    description: string;
};
