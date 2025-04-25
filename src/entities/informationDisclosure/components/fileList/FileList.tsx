import { FC } from "react";
import { FileDownload } from "../fileDownload/FileDownload";
import classes from './fileList.module.scss'
import { DeleteItem } from "../fileDelete/DeleteItem";


interface IProps {
    files: {name: string, value: string}[]
    onDeleteFile?: (ind: number) => void;
}

export const FileList: FC<IProps> = ({files, onDeleteFile}) => {

    
    return (
        <ul className={classes.list}>
            {files.map((file, ind) => 
                <li className={classes.item} key={ind}>
                    <FileDownload file={file}>
                        {onDeleteFile ? <DeleteItem onClick={() => onDeleteFile(ind)} /> : <></>}
                    </FileDownload>
                </li>
            )}
        </ul>
    )
}