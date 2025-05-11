"use client"
 
import { IProduct } from "@/src/entities/product"
import React, { ChangeEvent, FC, useEffect } from "react"
import addImgSrc from "@/src/shared/lib/assets/image-plus.png"
import classes from "./productImages.module.scss"
import { ImageList } from "../../../../entities/imagesList/components/ImagesList"

interface ProductImagesProps {
    images: IProduct['images'];
    setImages: (images: IProduct['images']) => void;
    required?: boolean; 
    setGlobalError?: (error: string) => void;
    addImg: React.ReactElement
}

export const ProductImages: FC<ProductImagesProps> = ({images, setImages, required = false, setGlobalError = () => {}, addImg}) => {

    async function convertImages(e: ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if(!files?.length) return
        let imgs: IProduct['images'] = [];
        setGlobalError('')
        for(let i = 0; i < files.length; i++){
            const file = files[i];
            const blobUrl = URL.createObjectURL(file)
            imgs = [...imgs, {name: file.name.replace(/\.[^/.]+$/, ""), blobUrl, file}];
        }    
        setImages(imgs)
    }

    useEffect(() => {
        if(!images.length) setGlobalError('Заполните обязательные поля')
    }, [images.length])

    return (
        <div className={classes.productImages}>
            <p data-title="title">Фотографии</p>
            <div className={classes.imagesDiv}>
                <label className={classes.addImages}>
                    <img src={addImgSrc.src} />
                    <p>загрузить</p>
                    <input onChange={convertImages} type='file' accept="image/*" multiple />
                </label>
                <div className={classes.imageList}>
                    <ImageList images={images} setImages={setImages} addImg={addImg} />
                </div>
            </div>
            <div className={classes.empty}>{required && !images.length && '*Обязательное поле'}</div>
        </div>
    )
}