"use client"

import { ILatestDevelopment, LatestDevelopmentCard } from "@/src/entities/latestDevelopment"
import { Arrows } from "@/src/shared/components/arrows/Arrows";
import { FC, useRef } from "react"
import classes from './slider.module.scss'
import { useRouter } from "next/navigation";
import { SliderImagesStatic } from "my-sliders";

interface IProps{
    latestDevelopments: ILatestDevelopment[];
}

export const Slider: FC<IProps> = ({latestDevelopments}) => {

    const refBackward = useRef<HTMLImageElement>(null)
    const refForward = useRef<HTMLImageElement>(null)

    const router = useRouter()

    const onClick = (ind: number) => {
        const target = latestDevelopments[ind]
        router.push(target.link)
    }

    return (
        <>
            <SliderImagesStatic
                onClick={onClick}
                widthItem={270}
                ms={450}
                showItems={true}
                refBackward={refBackward}
                refForward={refForward}
                elements={latestDevelopments.map(l =>
                    <section key={l.title} className={classes.card}> 
                        <LatestDevelopmentCard latestDevelopment={l} />
                    </section>
                )}
            />
            <Arrows 
                refForward={refForward}
                refBackward={refBackward}
            />
        </>
    )
}