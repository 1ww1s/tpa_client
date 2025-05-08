import { FC, PropsWithChildren } from "react"
import classes from '../fileDownload/fileDownload.module.scss'


interface IProps {
    file: {name: string, url: string}
}

export const FileOpen: FC<IProps & PropsWithChildren> = ({file, children}) => {

    return (
        <div className={classes.file}>
            <div className={classes.nameBox}>
                <a 
                    className={classes.name}
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL_API}${file.url}`} 
                    target="_blank" rel="noopener noreferrer"
                >
                    <span className={classes.type}>Открыть</span> {file.name}
                </a>
            </div>
            {children}
        </div>
    )
}