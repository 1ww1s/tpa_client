"use client"

import { FC, MouseEvent, useRef, useState } from "react";
import classes from './zoom.module.scss'
import { IImage } from "@/src/entities/image";

interface ImageJustProps {
    image: IImage;
}

export const Zoom: FC<ImageJustProps> = ({image}) => {

    const src = image?.blobUrl ? image?.blobUrl : `${process.env.NEXT_PUBLIC_SERVER_URL_API}${image?.url}`;

    const [isZoom, setIsZoom] = useState<boolean>(false)
    const imgRef = useRef<HTMLImageElement>(null)
    const [posX, setPosX] = useState<number>(0)
    const [posY, setPosY] = useState<number>(0)

    const onMouseMove = (e: MouseEvent) => {
        if(imgRef.current){
            const imgData = imgRef.current.getBoundingClientRect()
            const x = e.clientX - imgData.left;
            const y = e.clientY - imgData.top;
        
            const targetX = x / imgData.width * 100;
            const targetY = y / imgData.height * 100;
            setPosX(targetX)
            setPosY(targetY)
        }
    }

    return (
        <div className={classes.wrapper}>
            <img 
                ref={imgRef}
                src={src} 
                alt={image?.name}
            />
            <div 
                onMouseEnter={() => setIsZoom(true)}
                onMouseLeave={() => setIsZoom(false)}
                onMouseMove={onMouseMove}
                className={classes.zoomed} 
                style={{backgroundImage: `url(${src})`, backgroundPosition: `${posX}% ${posY}%`, opacity: isZoom ? '1' : '0'}}
            />
        </div>
    )
}