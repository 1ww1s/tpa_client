import { IPartner } from "../../model/types";


type TImage = {name: string, value: string};

export const usePartnerActions = (partner: IPartner, setPartner: (partner: IPartner) => void) => {
    return {
        setName(name: string){
            setPartner({...partner, name})
        },
        setImg(img: TImage){
            setPartner({...partner, img})
        },
    }
}