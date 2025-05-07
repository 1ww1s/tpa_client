import { FC, PropsWithChildren } from "react"
import classes from './fileDownload.module.scss'


interface IProps {
    file: {name: string, value: string}
}

export const FileDownload: FC<IProps & PropsWithChildren> = ({file, children}) => {

    const download = () => {
        const pdfDataUrl = file.value;
        const link = document.createElement('a');
        link.href = pdfDataUrl;
        link.download = `${file.name}.pdf`;
        link.click();
      };

    return (
        <div className={classes.file}>
            <div onClick={download} className={classes.nameBox}>
                <p 
                    className={classes.name}
                >
                    <span className={classes.type}>Скачать</span> {file.name}
                </p>
            </div>
            {children}
        </div>
    )
}