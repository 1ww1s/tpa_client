import { FC } from "react";
import classes from './partnersList.module.scss'
import { IPartner, PartnerLogo, partnerService } from "@/src/entities/partner";
import { TitleWithSeparator } from "@/src/shared/components/titleWithSeparator/components/TitleWithSeparator";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const getData = async () => {
    let partners: IPartner[] = [];
    try{
        partners = await partnerService.fetchGetAll()
    }
    catch(error){
        if(isDynamicServerError(error)){
            throw error;
        }
        console.log(error)
    }
    return partners
}


export const PartnersList: FC = async () => {

    const partners = await getData()

    return (
        <div className={classes.partnersList}>
            <TitleWithSeparator title="НАШИ ПАРТНЕРЫ" />
            <div className="wrapper">
                <div className={classes.content}>
                    <ul>
                        {partners.map((p, ind) => 
                            <li key={ind}><PartnerLogo img={p.img} /></li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}