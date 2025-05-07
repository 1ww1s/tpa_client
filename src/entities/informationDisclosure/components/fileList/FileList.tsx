import { FC } from "react";
import { FileDownload } from "../fileDownload/FileDownload";
import classes from './fileList.module.scss'
import { DeleteItem } from "../fileDelete/DeleteItem";
import { FileOpen } from "../fileOpen/FileOpen";

type T = {name: string, value?: string, file?: File, url?: string}

interface IProps {
    files: T[]
    onDeleteFile?: (ind: number) => void;
}

export const FileList: FC<IProps> = ({files, onDeleteFile}) => {

    return (
        <ul className={classes.list}>
            {files.map((file, ind) => 
                <li className={classes.item} key={ind}>
                {
                    file.value
                        ?
                    <FileDownload file={file as {name: string, value: string}}>
                        {onDeleteFile ? <DeleteItem onClick={() => onDeleteFile(ind)} /> : <></>}
                    </FileDownload>
                        :
                    file.url
                        ?
                    <FileOpen file={file as {name: string, url: string}}>
                        {onDeleteFile ? <DeleteItem onClick={() => onDeleteFile(ind)} /> : <></>}
                    </FileOpen>
                        :
                    <span>Ошбика загрузки файла</span>
                }
                </li>
            )}
        </ul>
    )
}