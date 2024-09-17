import { IRequisite } from "../../model/types"



export const useRequisiteActions = (requisite: IRequisite, setRequisite: (requisite: IRequisite) => void) => {

    return {
        setRequisite(requisite: IRequisite) {
            setRequisite(requisite)
        },
        setName(name: string){
            setRequisite({...requisite, name})
        },
        setValue(value: string){
            setRequisite({...requisite, value})
        },
    }
}