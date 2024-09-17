import { IPartner, IPartnerItem, partnerService } from "@/src/entities/partner";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const getData = async () =>  {
    let partners: IPartnerItem[] = [];
    try{
        partners = await partnerService.fetchNames()
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return partners
}


export default async function Partners() {

    const partners = await getData()

    return (
        <p>
            Основными покупателями нашей продукции являются
            {partners.map((p, ind) =>
                <span key={ind}> {p.name}{(partners.length - 1) !== ind && ','}</span>
            )}
            <span> и др.</span>
        </p>
    )
}