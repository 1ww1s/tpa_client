import { IProduct } from "../../model/types"
import { initialStateProduct } from "../../model/initialState"


export const useProductActions = (product: IProduct, setProduct: (product: IProduct) => void) => {

    return {
        setProduct(product: IProduct) {
            setProduct(product)
        },
        setName(name: string){
            setProduct({...product, name})
        },
        setInfo(info: string){
            setProduct({...product, info})
        },
        setImages(images: IProduct['images']){
            setProduct({...product, images})
        },
        setDeliverySet(deliverySet: IProduct['deliverySet']){
            setProduct({...product, deliverySet})
        },
        setFunctions(functions: IProduct['functions']){
            setProduct({...product, functions})
        },
        setMonAndIndParams(monAndIndParams: IProduct['monAndIndParams']){
            setProduct({...product, monAndIndParams})
        },
        setTechCharacteristics(techCharacteristics: IProduct['techCharacteristics']){
            setProduct({...product, techCharacteristics})
        },
        setModifications(modifications: IProduct['modifications']){
            setProduct({...product, modifications})
        },
        setPoductGroup(groupName: IProduct['groupName']){
            setProduct({...product, groupName})
        },
        refreshProduct(){
            setProduct({...initialStateProduct})
        },
        setSize(size: IProduct['size']){
            setProduct({...product, size})
        }
    }
}