import { ImageList } from "@/src/entities/imagesList";
import { ChangeEvent, FC, useState } from "react";
import classes from './uploadImage.module.scss'
import imagePlus from '@/src/shared/lib/assets/image-plus.png'

type TFile = {name: string, value?: string, url?: string, file?: File}

interface UploadImageProps {
    image: TFile;
    setImage: (images: TFile) => void;
}

export const UploadImageFile: FC<UploadImageProps> = ({image, setImage}) => {

    async function convertImages(e: ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if(!files?.length) return
        
        const file = files[0];
        
        const reader = new FileReader()
        
        reader.readAsDataURL(file)
        reader.onload = () => { 
            setImage({name: file.name.replace(/\.[^/.]+$/, ""), file: file, value: reader.result as string})
        }
    }

    const setImg = (imgs: TFile[]) => {
        setImage(imgs.length > 0 ? imgs[0] : {name: ''})
    }

    return (
        <div className={classes.imagesDiv}>
            <label className={classes.addImages}>
                <img src={imagePlus.src} />
                <p>загрузить</p>
                <input onChange={convertImages} type='file' accept="image/*" />
            </label>
            <div className={classes.imageList}>
                <ImageList images={(image.value || image.url) ? [image] : []} setImages={setImg} />
            </div>
        </div>
    )
}