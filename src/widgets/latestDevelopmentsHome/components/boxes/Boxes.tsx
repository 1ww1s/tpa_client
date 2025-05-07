import { ILatestDevelopment, LatestDevelopmentCard, latestDevelopmentsService } from "@/src/entities/latestDevelopment";
import { CarouselImages } from "@/src/features/carouselImages";
import { ClickOnLink } from "@/src/features/clickOnLink";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { FC } from "react"
import classes from './boxes.module.scss'

const getData = async () => {
    let latestDevelopments: ILatestDevelopment[] = [];
    try{
        // await new Promise(resolve => setTimeout(resolve, 4000))
        latestDevelopments = await latestDevelopmentsService.fetchGet()
    }
    catch(error){
        if(isDynamicServerError(error)){
            throw error;
        }
        console.log(error)
    }
    return latestDevelopments
}

export const Boxes: FC = async () => {

    const latestDevelopments = await getData()
    
    return (
        latestDevelopments.length
            ?
        <div className={classes.boxes}>
            <CarouselImages 
                images={latestDevelopments.map(l => ({...l.img, name: l.title}))} 
                children={
                    latestDevelopments.map(l =>
                        <ClickOnLink key={l.title} href={l.link}>
                            <LatestDevelopmentCard latestDevelopment={l} />
                        </ClickOnLink>
                    )
                }
            />
        </div>
            :
        <></>
    )
}