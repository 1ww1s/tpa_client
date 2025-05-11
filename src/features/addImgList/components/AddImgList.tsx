import { ChangeEvent, FC, InputHTMLAttributes } from "react";
import plus from '@/src/shared/lib/assets/plus.png'
import classes from './addImgList.module.scss'

type T = {name: string, url?: string, blobUrl?: string, file?: File}

interface AddImgProps {
    images: T[];
    setImages: (images: T[]) => void;
    accept?: InputHTMLAttributes<HTMLInputElement>['accept'];
    reverse?: boolean;
}

export const AddImgList: FC<AddImgProps> = ({images, setImages, accept="image/*", reverse=false}) => {

    async function convertImages(e: ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if(!files?.length) return
        const file = files[0];
        const blobUrl = URL.createObjectURL(file)
        reverse
            ?
        setImages([{name: file.name.replace(/\.[^/.]+$/, ""), file, blobUrl}, ...images])
            :
        setImages([...images, {name: file.name.replace(/\.[^/.]+$/, ""), file, blobUrl}])
    }

    return (
        <label className={classes.addImage}>
            <input onChange={convertImages} type='file' accept={accept}  />
            <img src={plus.src} />
        </label>
    )
}