import { FC } from "react";
import classes from './whyUsCard.module.scss'

interface WhyUsCardProps {
    ind: number;
    title: string;
    description: string;
    iconSrc: string;
}


export const WhyUsCard: FC<WhyUsCardProps> = ({title, description, ind, iconSrc}) => {

    
    return (
        <div className={classes.whyUsCard}>
            <div className={classes.title}>
                <div className={classes.index}>{'0' + ind}</div>
                <h4>{title}</h4>
                <img src={iconSrc} alt={`Иконка "${title}"`} />
            </div>
            <div className={classes.description}>
                <p>{description}</p>
            </div>
        </div>
    )
}