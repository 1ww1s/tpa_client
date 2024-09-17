import { FC } from "react";
import classes from './latestDevelopments.module.scss'
import { ClickLatestDevelopment } from "@/src/features/clickLatestDevelopment";
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
        <div className={classes.latestDevelopments}>
            <h2>НАШИ ПОСЛЕДНИЕ<br /> РАЗРАБОТКИ</h2>
            <img className={classes.hrImg} src={hrImg.src} />
            {latestDevelopments.map(l => 
                <div key={l.name} className={classes.latestDevelopment}>
                    <ClickLatestDevelopment latestDevelopmentPreview={l}>
                        <LatestDevelopmentPreview latestDevelopmentPreview={l} />
                    </ClickLatestDevelopment>
                </div>
            )}
        </div>
    )
}