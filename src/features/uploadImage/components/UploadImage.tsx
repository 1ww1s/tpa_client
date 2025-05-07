import { ImageList } from "@/src/entities/imagesList";
import { ChangeEvent, FC, useEffect, useState } from "react";
import classes from './uploadImage.module.scss'
import imagePlus from '@/src/shared/lib/assets/image-plus.png'

type T = {name: string, value: string}

interface UploadImageProps {
    image: T;
    setImage: (images: T) => void;
}

export const UploadImage: FC<UploadImageProps> = ({image, setImage}) => {

    const [images, setImages] = useState<{name: string, value?: string}[]>([])

    useEffect(() => {
        if(image?.value){
            setImages([image])
        }
    }, [])

    useEffect(() => {
        if(images.length > 1) {
            setImages([images[1]])
            setImage(images[1] as T)
        }
        else{
            setImage(images[0] as T)
        }
    }, [images])

    async function convertImages(e: ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if(!files?.length) return
        const file = files[0]
        const reader = new FileReader()
    
        reader.readAsDataURL(file)
        reader.onload = () => { 
            setImages([{name: file.name.replace(/\.[^/.]+$/, ""), value: reader.result as string}])
        }
    }

    return (
        <div className={classes.imagesDiv}>
            <label className={classes.addImages}>
                <img src={imagePlus.src} />
                <p>загрузить</p>
                <input onChange={convertImages} type='file' accept="image/*" />
            </label>
            <div className={classes.imageList}>
                <ImageList images={images} setImages={setImages} />
            </div>
        </div>
    )
}