"use client"

import { FC, PropsWithChildren, ReactElement, useRef } from "react"
import classes from './pp2.module.scss'
import hrImg from '@/src/shared/lib/assets/hr.png'
import Image from "next/image";
import { useObserver } from "@/src/shared/lib/hooks/useObserver";

interface ProductPreviewProps {
    title: string;
    info: string;
    img: {name: string, value: string};
    loaderDiv?: ReactElement;
    observed?: boolean; 
}

export const ProductPreview: FC<ProductPreviewProps & PropsWithChildren> = ({title, info, img, observed = false, loaderDiv, children}) => {

    const ref = useRef(null)
    if(observed){
        useObserver(ref, (elem: Element) => elem.classList.add(classes.observed), classes.img)
    }

    const getShortString = (string: string, maxLength: number) => {
        const news = string.slice(0, maxLength)
        const lastWhitespace = news.lastIndexOf(' ')
        const toLastWord = news.slice(0, lastWhitespace)
        const finalString = toLastWord.endsWith(',') ? toLastWord.slice(0, lastWhitespace - 1) :
        toLastWord.endsWith('.') ? toLastWord.slice(0, lastWhitespace - 1) : toLastWord
        return finalString
    }

    return (
        <div className={classes.productPreview}>
            <div className={classes.content}>
                <div className={classes.image}>
                    {loaderDiv}
                    <Image ref={ref} className={observed ? classes.img : ''} src={img.value} width={340} height={340} alt={img.name} />
                </div>
                <div className={classes.caption}>
                    <div className={classes.title}>{title}</div>
                    <img className={classes.hrImg} src={hrImg.src} />
                    <div className={classes.info}>{info}</div>
                    <div className={classes.info + ' ' + classes.infoShort}>{info.length >= 100 ? getShortString(info, 110) + '...' : info}</div>

                    <div className={classes.link}>
                            {children}
                    </div>
                </div>
            </div>
            <div className={classes.hr}></div>
        </div>
    )
}