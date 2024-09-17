import { FC } from "react"
import classes from './certificatePreview.module.scss'
import Image from "next/image";
import { ICertificate } from "../../model/types";

interface CertificatePreviewProps {
    certificate: ICertificate;
}

export const CertificatePreview: FC<CertificatePreviewProps> = ({certificate}) => {

    return (
        <div className={classes.productPreview}>
            <div className={classes.content}>
                <div className={classes.image}>
                    <Image src={certificate.img.value} width={200} height={200} alt={certificate.img.name} />
                </div>
                <div className={classes.caption}>
                    <div className={classes.name}>Название: <span>{certificate.name}</span></div>
                    <div className={classes.endDate}>Дата окончания действия: <span>{certificate.endDate}</span></div>
                </div>
            </div>
        </div>
    )
}