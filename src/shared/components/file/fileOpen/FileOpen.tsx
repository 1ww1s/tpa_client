import { FC, PropsWithChildren } from "react"
import classes from './fileOpen.module.scss'
import pdfIcon from '@/src/shared/lib/assets/pdf.webp'
import Image from "next/image";

interface IProps {
    file: {name: string, url: string}
    sign?: string;
    pdf?: boolean;
}

export const FileOpen: FC<IProps & PropsWithChildren> = (
    {file, sign, pdf, children}
) => {

    return (
        <div className={classes.file}>
            <div className={classes.nameBox}>
                <a 
                    className={classes.name}
                    href={file.url} 
                    target="_blank" rel="noopener noreferrer"
                >
                    <span><span  className={classes.type}>{sign || 'Открыть'}</span> {file.name}</span> 
                    { pdf && <Image src={pdfIcon.src} width={39} height={50} alt="pdf" /> }
                </a>
            </div>
            {children}
        </div>
    )
}