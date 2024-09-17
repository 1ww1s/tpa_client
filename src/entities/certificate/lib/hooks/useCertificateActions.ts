import { ICertificate } from "../../model/types"



export const useCertificateActions = (certificate: ICertificate, setCertificate: (certificate: ICertificate) => void) => {

    return {
        setCertificate(certificate: ICertificate) {
            setCertificate(certificate)
        },
        setName(name: string){
            setCertificate({...certificate, name})
        },
        setImg(img: ICertificate['img']){
            setCertificate({...certificate, img})
        },
        setEndDate(endDate: string){
            setCertificate({...certificate, endDate})
        },
    }
}