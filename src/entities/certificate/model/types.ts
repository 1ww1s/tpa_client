


export interface ICertificate {
    id?: number;
    name: string;
    img: {id?: number, name: string, url?: string, value?: string, file?: File};
    endDate: string;
}