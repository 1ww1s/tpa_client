import { ILatestDevelopment, LatestDevelopmentCard, latestDevelopmentsService } from "@/src/entities/latestDevelopment";
// import { CarouselImages } from "@/src/features/carouselImages";
import { ClickOnLink } from "@/src/features/clickOnLink";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { FC } from "react"
import classes from './boxes.module.scss'
import { SliderImagesStatic } from "my-sliders";
import { Slider } from "../slider/Slider";

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
            <Slider 
                latestDevelopments={latestDevelopments} 
            />
        </div>
            :
        <></>
    )
}