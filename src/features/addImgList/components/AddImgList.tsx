import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import plus from '@/src/shared/lib/assets/plus.png'
import classes from './addImgList.module.scss'
import { LoaderSpinner } from "@/src/shared/components/loaderSpinner/LoaderSpinner";

type T = {name: string, value: string}

interface AddImgProps {
    images: T[];
    setImages: (images: T[]) => void;
    accept?: InputHTMLAttributes<HTMLInputElement>['accept'];
    reverse?: boolean;
}

export const AddImgList: FC<AddImgProps> = ({images, setImages, accept="image/*", reverse=false}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function convertImages(e: ChangeEvent<HTMLInputElement>){
        const files = e.target.files;
        if(!files?.length) return
        setIsLoading(true)
        const file = files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => { 
            setIsLoading(false)
            reverse
                ?
            setImages([{name: file.name.replace(/\.[^/.]+$/, ""), value: reader.result as string}, ...images])
                :
            setImages([...images, {name: file.name.replace(/\.[^/.]+$/, ""), value: reader.result as string}])
        }
    }

    return (
        isLoading
            ?
        <div className={classes.loaderBox}>
            <LoaderSpinner />
        </div>
            :
        <label className={classes.addImage}>
            <input onChange={convertImages} type='file' accept={accept}  />
            <img src={plus.src} />
        </label>
    )
}