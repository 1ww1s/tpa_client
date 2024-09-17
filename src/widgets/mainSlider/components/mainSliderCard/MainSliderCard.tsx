import { FC } from "react";
import classes from './mainSliderCard.module.scss'
import mainImage from '../../lib/assets/mainImage.png'
import Image from "next/image";
import { Caption } from "../caption/Caption";

interface MainSliderCardProps {
    action: React.ReactElement;
}

export const MainSliderCard: FC<MainSliderCardProps> = ({action}) => {
    return (
        <div className={classes.mainSlider}>
            <Image src={mainImage.src} width={mainImage.width} height={mainImage.height} alt="" />
            <Caption children={action} />
        </div>
    )
}