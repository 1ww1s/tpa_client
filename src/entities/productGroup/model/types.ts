

export interface IProductGroup{
    id: number;
    title: string;
    info: string;
    img: {name: string, value: string};
    slug: string;
    index?: number;
}


export interface IProductGroupItem {
    name: string;
    slug: string;
}