

export interface IProductGroup {
    id: number;
    title: string;
    info: string;
    img: {id?: number, name: string, url?: string, blobUrl?: string, file?: File};
    slug: string;
    index?: number;
}

export interface IProductGroupItem {
    name: string;
    slug: string;
}