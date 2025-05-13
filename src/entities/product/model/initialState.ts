import { IProduct, IProductPreview } from "./types";


export const initialStateProductPreview: IProductPreview = {
    id: -1,
    title: '',
    slug: '',
    info: '',
    img: {name: '', url: ''}
}

export const initialStateProduct: IProduct = {
    id: 0,
    groupSlug: '',
    name: '',
    info: '',
    slug: '',
    images: [],
    size: {name: ''},
    functions: '',
    monAndIndParams: '',
    deliverySet: [],
    modifications: {
        items: [{id: -1, name: 'Значение'}],
        data: []
    },
    techCharacteristics: {
        items: [{id: -1, name: 'Значение'}],
        data: []
    }
}
