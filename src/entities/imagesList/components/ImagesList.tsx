"use client"

import React, { ReactElement } from "react";
import classes from './imagesList.module.scss'
import remove from '@/src/shared/lib/assets/x-close.png'
import Image from "next/image";

type T = {name: string, url?: string, blobUrl?: string, file?: File}

interface ImageListProps {
    images: T[];
    setImages: (images: T[]) => void;
    addImg?: ReactElement
}

export const ImageList = (props: ImageListProps) => {

    const removeImage = (index: number) => {
        let imgs = [...props.images];
        const img = imgs[index]
        if(img.blobUrl) {
            URL.revokeObjectURL(img.blobUrl)
        }
        imgs.splice(index, 1)
        props.setImages(imgs)
    }

    return (
        <div className={classes.listBox}>
            {props.images.map((image, ind) => 
                <div key={ind} className={classes.listItem}>
                    <Image 
                        width={14}
                        height={14}
                        alt="remove"
                        className={classes.remove} 
                        src={remove.src} 
                        onClick={() => removeImage(ind)}
                    />
                    <img 
                        src={image ? image.blobUrl ? image.blobUrl : `${process.env.NEXT_PUBLIC_SERVER_URL_API}${image.url}` : ''} 
                        className={classes.image} 
                    />
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