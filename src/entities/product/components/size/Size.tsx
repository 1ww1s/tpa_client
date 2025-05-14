import { FC } from "react";
import classes from './size.module.scss'
import { IProduct } from "../../model/types";
import { FileList } from "@/src/shared/components/file/fileList/FileList";

interface Props {
    size: IProduct['size'];
}

export const ProductSize: FC<Props> = ({size}) => {
    return (
        <div className={classes.productSize}>
            <h2>Габаритные размеры</h2>
            <FileList 
                sign="Открыть файл"
                files={[size]} 
            />
        </div>
    )
}