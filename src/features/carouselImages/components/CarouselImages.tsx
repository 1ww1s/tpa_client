"use client"

import { IImage } from "@/src/entities/image";
import { DragEvent, FC, ReactElement, useRef, useState } from "react";
import classes from './carouselImages.module.scss'
import arrow from '@/src/shared/lib/assets/arrow-down.png'

interface CarouselImagesProps {
    images: IImage[];
    children: ReactElement[];
}

const initialStyle = {
    width: '280px',
    marginRirht: '10px',
}

const sizeBox = parseInt(initialStyle.width) + 2 * parseInt(initialStyle.marginRirht)
 
export const CarouselImages: FC<CarouselImagesProps> = ({images, children}) => {

    const initialNumb = images.length === 1 ? images.length : images.length - 1;
    const initialLeft = -(sizeBox * initialNumb);
    const [f, setF] = useState<number>(initialLeft)
    const [previousTime, setPreviousTime] = useState<number>(0)

    const ref = useRef<HTMLDivElement>(null)
    const forward = () => {
        if(f === (initialLeft - (sizeBox * initialNumb))){
            ref.current!.style.transition = ''
            setF(initialLeft + sizeBox)
            setTimeout(() => {setF(initialLeft), ref.current!.style.transition = 'all 0.5s ease 0s'})
        }
        else{
            setF(f - sizeBox)
        }
    }
    
    const backward = () => {
        if(f === (initialLeft + sizeBox * initialNumb)){
            ref.current!.style.transition = ''
            setF(initialLeft - sizeBox)
            setTimeout(() => {
                setF(initialLeft),
                ref.current!.style.transition = 'all 0.5s ease 0s'
            })
        }
        else{
            setF(f + sizeBox)
        }
    }
    
    const checkTime = (func: () => void, ms: number) => {
        const nowTime = Date.now()
        if(nowTime - previousTime <= ms){
            return
        }
        setPreviousTime(nowTime)
        func()
    }

    const dragSt = (e: DragEvent<HTMLDivElement>) => {
        
        
    }

    return (
        <div className={classes.switchImages} style={images.length === 1 ? {width: `${sizeBox}px`} : {}}>
            <div className={classes.imagesBlock}>
                <div 
                    ref={ref} 
                    style={{
                        transform: `translate3d(${f}px, 0px, 0px)`, 
                        transition: 'all 0.5s ease 0s', 
                        width: `${sizeBox * images.length * 3}px`,
                    }} 
                    className={classes.imageList}
                    onDragStart={(e) => {dragSt(e)}}
                    // onMouseDown={(e) => {e.preventDefault()}}
                    // onClick={(e) => {e.preventDefault()}}
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
                <img onClick={() => checkTime(backward, 250)} className={classes.backward} src={arrow.src} alt="Назад" />
                <img onClick={() => checkTime(forward, 250)} className={classes.forward} src={arrow.src} alt="Вперед" />
            </div>
        </div>
    )
}