import { initialStateProduct, IProduct } from "@/src/entities/product";
import { AddImgList } from "@/src/features/addImgList";
import { FC, useRef } from "react";
import { OpenDiv } from "../openDiv/OpenDiv";
import classes from './size.module.scss'
import { FileList } from "@/src/shared/components/file/fileList/FileList";


interface Props {
    size: IProduct['size']
    setSize: (size: IProduct['size']) => void;
}

export const Size: FC<Props> = (
    {size, setSize}) => {

    const refSize = useRef<HTMLDivElement>(null)

    const setFiles = (files: IProduct['size'][]) => {
        console.log(files)
        setSize(files[0])
    }

    const deleteItem = (ind: number) => {
        if(size.blobUrl){
            URL.revokeObjectURL(size.blobUrl)
        }
        setSize(initialStateProduct.size)
    }
    
    return (
        <div className={classes.size}>
            <OpenDiv title="Габаритные размеры" refToggle={refSize} toggleClasses={classes} />
            <div ref={refSize} className={classes.sizeDiv}>
                <AddImgList
                    reverse={true} 
                    setImages={setFiles} 
                    images={[size]} 
                    accept=".pdf" 
                />
                <FileList
                    sign={size.url && 'Открыть файл'}
                    files={(size?.blobUrl || size?.url) ? [size] : []} onDeleteFile={deleteItem} 
                />
            </div>
        </div>
    )
}