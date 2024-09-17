import { IProductGroup } from "../../model/types"



export const useProductGroupActions = (productGroup: IProductGroup, setProductGroup: (productGroup: IProductGroup) => void) => {

    return {
        setProductGroup(productGroup: IProductGroup) {
            setProductGroup(productGroup)
        },
        setTitle(title: string){
            setProductGroup({...productGroup, title})
        },
        setSlug(slug: string){
            setProductGroup({...productGroup, slug})
        },
        setImg(img: IProductGroup['img']){
            setProductGroup({...productGroup, img})
        },
        setInfo(info: string){
            setProductGroup({...productGroup, info})
        },
    }
}