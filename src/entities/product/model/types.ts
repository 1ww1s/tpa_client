
export interface IFile {
    id?: number;
    name: string;
    url?: string;
    blobUrl?: string;
    file?: File;
}

export interface IDeliverySet {
    id: number;
    name: string;
    numb: string;
    note: string;
}

export interface IModification {
    id: number;
    name: string;
    value: {id: number; value: string}[]
}

export interface ITechCharacteristic {
    id: number;
    name: string;
    unit: string;
    value: {id: number; value: string}[]
}

export interface IProduct {
    id: number;
    name: string;
    groupName: string;
    info: string;
    slug: string;
    images: IFile[];
    size: IFile;
    functions: string;
    monAndIndParams: string;
    deliverySet: IDeliverySet[];
    modifications: {
        items: { id: number; name: string }[];
        data: IModification[];
    }
    techCharacteristics: {
        items: { id: number; name: string }[];
        data: ITechCharacteristic[];
    }
}

export interface IProductPreview{
    id: number;
    title: string;
    info: string;
    img: {name: string, url: string};
    slug: string;
}


export interface IProductItem {
    name: string;
    slug: string;
}