import { ChangeEvent, FC } from "react";
import plus from '@/src/shared/lib/assets/plus.png'
import classes from './addImgList.module.scss'

type T = {name: string, value: string}

interface AddImgProps {
    images: T[];
    setImages: (images: T[]) => void;
}

export const AddImgList: FC<AddImgProps> = ({images, setImages}) => {

    async function convertImages(e: ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if(!files?.length) return
        const file = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => { 
            setImages([...images, {name: file.name.replace(/\.[^/.]+$/, ""), value: reader.result as string}])
        }
    }

    return (
        <label className={classes.addImage}>
            <input onChange={convertImages} type='file' accept="image/*"  />
            <img src={plus.src} />
        </label>
    )
}