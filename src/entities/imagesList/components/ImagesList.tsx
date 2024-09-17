"use client"

import React, { ChangeEvent, ReactElement } from "react";
import classes from './imagesList.module.scss'
import remove from '@/src/shared/lib/assets/x-close.png'
import Image from "next/image";
import plus from '@/src/shared/lib/assets/plus.png'

type T = {name: string, value: string}

interface ImageListProps {
    images: T[];
    setImages: (images: T[]) => void;
    addImg?: ReactElement
}

export const ImageList = (props: ImageListProps) => {


    const removeImage = (index: number) => {
        let imgs = [...props.images];
        imgs.splice(index, 1)
        props.setImages(imgs)
    }
    
    return (
        <div className={classes.listBox}>
            {props.images.map((image, ind) => 
                <div key={Math.random()} className={classes.listItem}>
                    <Image 
                        width={14}
                        height={14}
                        alt="remove"
                        className={classes.remove} 
                        src={remove.src} 
                        onClick={() => removeImage(ind)}
                    />
                    <img className={classes.image} src={image.value} />
                    <p>{image.name}</p>
                </div>
            )}
            {
                props.images.length 
                    ?
                props?.addImg
                    :
                <></>
            }
        </div>
    )
}