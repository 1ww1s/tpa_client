

export interface IInformationDisclosure {
    id?: number;
    name: string;
    files: {id?: number, name: string, url?: string, blobUrl?: string, file?: File}[];
}

