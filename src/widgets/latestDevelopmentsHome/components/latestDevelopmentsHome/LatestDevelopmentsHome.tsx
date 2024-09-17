import { ILatestDevelopment, LatestDevelopmentCard, latestDevelopmentsService } from "@/src/entities/latestDevelopment";
import { FC } from "react";
import classes from './latestDevelopments.module.scss'
import { TitleWithSeparator } from "@/src/shared/components/titleWithSeparator/components/TitleWithSeparator";
import { ClickLatestDevelopment } from "@/src/features/clickLatestDevelopment";
import { CarouselImages } from "@/src/features/carouselImages";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const getData = async () => {
    let latestDevelopments: ILatestDevelopment[] = [];
    try{
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

export const LatestDevelopmentsHome: FC = async () => {

    const latestDevelopments = await getData()

    return (
        <div className={classes.latestDevelopments}>
            <div className="wrapper">
                <TitleWithSeparator title="НАШИ ПОСЛЕДНИЕ РАЗРАБОТКИ" />
                <div className={classes.boxes}>
                    <CarouselImages 
                        images={latestDevelopments.map(l => l.img)} 
                        children={
                            latestDevelopments.map(l =>
                                <ClickLatestDevelopment key={l.name} latestDevelopmentPreview={l}>
                                    <LatestDevelopmentCard latestDevelopment={l} />
                                </ClickLatestDevelopment>
                            )
                        }
                    />
 
                </div>
            </div>
        </div>
    )
}