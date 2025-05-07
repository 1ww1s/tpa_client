import { FC } from "react";
import classes from './latestDevelopments.module.scss'
import { ClickOnLink } from "@/src/features/clickOnLink";
import { ILatestDevelopment, LatestDevelopmentPreview, latestDevelopmentsService } from "@/src/entities/latestDevelopment";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import hrImg from '@/src/shared/lib/assets/hr.png'

const getData = async () =>  {
    let latestDevelopments: ILatestDevelopment[] = [];
    try{
        latestDevelopments = await latestDevelopmentsService.fetchGet()
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return latestDevelopments
}

export const LatestDevelopments: FC = async () => {
    
    const latestDevelopments = await getData()
    
    return (
        latestDevelopments.length !== 0
            &&
        <div className={classes.latestDevelopments}>
            <h2>НАШИ ПОСЛЕДНИЕ<br /> РАЗРАБОТКИ</h2>
            <img className={classes.hrImg} src={hrImg.src} />
            {latestDevelopments.map(l => 
                <div key={l.title} className={classes.latestDevelopment}>
                    <ClickOnLink href={l.link}>
                        <LatestDevelopmentPreview latestDevelopmentPreview={l} />
                    </ClickOnLink>
                </div>
            )}
        </div>
    )
}