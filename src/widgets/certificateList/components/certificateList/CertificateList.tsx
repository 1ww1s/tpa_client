import { certificateService, ICertificate } from "@/src/entities/certificate";
import { FC } from "react";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { CertificateCarousel } from "../certificateCarousel/CertificateCarousel";
import { Empty } from "@/src/shared/components/empty/Empty";

const getData = async () =>  {
    let certificates: ICertificate[] = [];
    try{
        certificates = await certificateService.fetchGetAll()
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return certificates
}

export const CertificateList: FC = async () => {
    
    let certificates = await getData();

    if(!certificates.length) return <Empty />

    return (
        <CertificateCarousel certificates={certificates} />
    )
}

