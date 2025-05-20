"use client"

import { ILatestDevelopment, LatestDevelopmentCard } from "@/src/entities/latestDevelopment"
import { ClickOnLink } from "@/src/features/clickOnLink";
import { Arrows } from "@/src/shared/components/arrows/Arrows";
import { SliderImagesStatic } from "my-sliders";
import { FC, useRef } from "react"
import classes from './slider.module.scss'

interface IProps{
    latestDevelopments: ILatestDevelopment[];
}

export const Slider: FC<IProps> = ({latestDevelopments}) => {

    const refBackward = useRef<HTMLImageElement>(null)
    const refForward = useRef<HTMLImageElement>(null)
    
    return (
        <>
            <SliderImagesStatic

                    widthItem={270}
                    ms={450}
                    refBackward={refBackward}
                    refForward={refForward}
                    elements={latestDevelopments.map(l =>
                            <ClickOnLink key={l.title} href={l.link}>
                                <section className={classes.card}> 
                                    <LatestDevelopmentCard latestDevelopment={l} />
                                </section>
                            </ClickOnLink>
                    )}
            />
            <Arrows 
                refForward={refForward}
                refBackward={refBackward}
            />
        </>
    )
}