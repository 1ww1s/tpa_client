
export interface IImage {
    id?: number;
    name: string;
    value: string;
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
    diesel: string;
    note: string
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
    images: IImage[];
    functions: string;
    monAndIndParams: string;
    deliverySet: IDeliverySet[];
    modifications: IModification[];
    techCharacteristics: {
        items: { id: number; name: string }[];
        data: ITechCharacteristic[]
    }
}

export interface IProductPreview{
    id: number;
    title: string;
    info: string;
    img: {name: string, value: string};
    slug: string;
}


export interface IProductItem {
    name: string;
    slug: string;
}