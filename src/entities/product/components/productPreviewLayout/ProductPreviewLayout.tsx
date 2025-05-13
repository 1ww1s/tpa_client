"use client"

import { FC, ReactElement } from "react"
import classes from '../productPreview/pp2.module.scss'
import classes2 from './productPreviewLayout.module.scss'

interface ProductPreviewLayoutProps{
    loaderDiv: ReactElement;
    numb?: number;
}

export const ProductPreviewLayout: FC<ProductPreviewLayoutProps> = ({loaderDiv, numb = 1}) => {

    const mas = []
    for(let i = 0; i < numb; i++){
        mas.push(i)
    }

    return (
        mas.map((m, ind) => 
            <div className={classes.productPreview} key={ind}>
                <div className={classes.content}>
                    <div className={classes.image}>
                        {loaderDiv}
                    </div>
                    <div className={classes.caption + ' ' + classes2.caption}>
                        <div className={classes.title + ' ' + classes2.title}>{loaderDiv}</div>
                        <div className={classes2.hr}>{loaderDiv}</div>
                        <div className={classes.info + ' ' + classes2.info}>{loaderDiv}</div>
                        <div className={classes.infoShort + ' ' + classes2.info}>{loaderDiv}</div>
                        <div className={classes.link + ' ' + classes2.link}>{loaderDiv}</div>
                    </div>
                </div>
                <div className={classes.hr}></div>
            </div>        
        )
    )
}