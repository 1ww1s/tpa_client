


export interface ICertificate {
    id?: number;
    name: string;
    img: {id?: number, name: string, url?: string, blobUrl?: string, file?: File};
    endDate: string;
}