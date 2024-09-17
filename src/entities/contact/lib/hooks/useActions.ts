import { useAppDispatch } from "@/src/shared/lib/hooks/redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { IContact } from "../../model/types"



export const useContactActions = (contact: IContact, setContact: (contact: IContact) => void) => {
    return {
        setTelephone(description: string){
            setContact({...contact, description})
        },
        setEmail(description: string){
            setContact({...contact, description})
        },
        setOpeningHours(description: string){
            setContact({...contact, description})
        },
        setAddress(description: string){
            setContact({...contact, description})
        },
    }
}