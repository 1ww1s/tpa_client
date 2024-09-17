import { IProduct, IProductPreview } from "./types";


export const initialStateProductPreview: IProductPreview = {
    id: -1,
    title: '',
    slug: '',
    info: '',
    img: {value: '', name: ''}
}

export const initialStateProduct: IProduct = {
    id: 0,
    groupName: '',
    name: '',
    info: '',
    slug: '',
    images: [],
    functions: '',
    monAndIndParams: '',
    deliverySet: [],
    modifications: [],
    techCharacteristics: {
        items: [{id: -1, name: 'Значение'}],
        data: []
    }
}
