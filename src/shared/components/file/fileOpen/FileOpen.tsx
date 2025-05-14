import { FC, PropsWithChildren } from "react"
import classes from './fileOpen.module.scss'


interface IProps {
    file: {name: string, url: string}
    sign?: string;
}

export const FileOpen: FC<IProps & PropsWithChildren> = ({file, sign, children}) => {

    return (
        <div className={classes.file}>
            <div className={classes.nameBox}>
                <a 
                    className={classes.name}
                    href={file.url} 
                    target="_blank" rel="noopener noreferrer"
                >
                    <span className={classes.type}>{sign || 'Открыть'}</span> {file.name}
                </a>
            </div>
            {children}
        </div>
    )
}