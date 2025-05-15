import { FC } from "react";
import classes from './fileList.module.scss'
import { DeleteItem } from "../fileDelete/DeleteItem";
import { FileOpen } from "../fileOpen/FileOpen";

type T = {name: string, blobUrl?: string, file?: File, url?: string}

interface IProps {
    files: T[]
    onDeleteFile?: (ind: number) => void;
    sign?: string;
    pdf?: boolean;
}

export const FileList: FC<IProps> = ({files, onDeleteFile, sign, pdf}) => {

    return (
        <ul className={classes.list}>
            {files.map((file, ind) => 
                <li className={classes.item} key={ind}>
                {
                    file.blobUrl || file.url
                        ?
                    <FileOpen pdf={pdf} sign={sign} file={{name: file.name, url: file.blobUrl ? file.blobUrl as string : `${process.env.NEXT_PUBLIC_SERVER_URL_API}${file.url}`}}>
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