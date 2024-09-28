"use client"

import { IImage } from "@/src/entities/image";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import classes from './carouselImages.module.scss'
import arrow from '@/src/shared/lib/assets/arrow-down.png'

interface CarouselImagesProps {
    images: IImage[];
    children: ReactElement[];
}

const initialStyle = {
    width: '290px',
    marginRirht: '10px',
}

const sizeBox = parseInt(initialStyle.width) + parseInt(initialStyle.marginRirht)
 
export const CarouselImages: FC<CarouselImagesProps> = ({images, children}) => {

    const initialNumb = images.length - 1;
    const initialLeft = -(sizeBox * initialNumb);
    const [imgs, setImgs] = useState<IImage[]>([...images])
    const [f, setF] = useState<number>(initialLeft)

    const ref = useRef<HTMLDivElement>(null)
    const forward = () => {
        if(f === (initialLeft - (sizeBox * initialNumb))){
            ref.current!.style.transition = ''
            setF(initialLeft + sizeBox)
            setTimeout(() => {setF(initialLeft), ref.current!.style.transition = 'all 0.5s ease 0s'}, 0)
        }
        else{
            setF(f - sizeBox)
        }
    }

    const backward = () => {
        if(f === (initialLeft + sizeBox * initialNumb)){
            ref.current!.style.transition = ''
            setF(initialLeft - sizeBox)
            setTimeout(() => {setF(initialLeft), ref.current!.style.transition = 'all 0.5s ease 0s'}, 0)
        }
        else{
            setF(f + sizeBox)
        }
    }


    return (
        <div className={classes.switchImages}>
            <div className={classes.imagesBlock}>
                <div 
                    ref={ref} 
                    style={{
                        transform: `translate3d(${f}px, 0px, 0px)`, 
                        transition: 'all 0.5s ease 0s', 
                        width: `${sizeBox * images.length * 3}px`
                    }} 
                    className={classes.imageList}
                >
                    {children.map((c, ind) => 
                        <div key={ind + 'a'} style={{width: initialStyle.width, margin: initialStyle.marginRirht}}  className={classes.image}>
                            {c}
                        </div>
                    )}
                    {children.map((c, ind) => 
                        <div key={ind + 'b'} style={{width: initialStyle.width, margin: initialStyle.marginRirht}}  className={classes.image}>
                            {c}
                        </div>
                    )}
                      {children.map((c, ind) => 
                        <div key={ind + 'c'} style={{width: initialStyle.width, margin: initialStyle.marginRirht}}  className={classes.image}>
                            {c}
                        </div>
                    )}
                </div>
            </div>
            
            <div className={classes.switch}>
                <img onClick={backward} className={classes.backward} src={arrow.src} />
                <img onClick={forward} className={classes.forward} src={arrow.src} />
            </div>
        </div>
    )
}