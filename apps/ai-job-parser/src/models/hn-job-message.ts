export interface HnJobMessage {
    _id: any;
    time: number;
    id: string;
    threadId: string;
    title: string;
    text: string;
    author: string;
    urls: string[];
    date: number;
    hasRemote: boolean;
    hasQA: boolean;
    hasFrontend: boolean;
}

export interface BasicHnJobMessage {
    title: string;
    text: string;
}
