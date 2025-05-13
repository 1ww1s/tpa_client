import { FC } from "react";
import classes from './pageTitle.module.scss'
import controlPanel from '../../lib/assets/controlPanel.webp'
import certificate from '../../lib/assets/certificates.webp'
import product from '../../lib/assets/product.png'
import Image from "next/image";


type TImage = 'Сертификаты' | 'Продукт' | 'Панель управления'

interface PageTitleProps {
    title: string;
    image?: TImage;
}

export const PageTitle: FC<PageTitleProps> = ({title, image}) => {

    const chooseImage = () => {
        let imgSrc: string = ''
        if(image === 'Панель управления'){
            imgSrc = controlPanel.src;
        }
        else if(image === 'Сертификаты'){
            imgSrc = certificate.src;
        }
        else if(image === 'Продукт'){
            imgSrc = product.src;
        }
        return imgSrc
    }

    return (
        <div className={classes.pageTitle}>
            {image && <Image width={1340} height={220}  src={chooseImage()} alt={image} />}
            <div className="wrapper">
                <div className={classes.title}>{title}</div>
            </div>
        </div>
    )
}