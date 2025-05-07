

export interface IInformationDisclosure {
    id?: number;
    name: string;
    files: {id?: number, name: string, url?: string, value?: string, file?: File}[];
}

