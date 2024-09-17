import { FC } from "react";
import classes from './titleWithSeparator.module.scss'
import separator from '@/src/shared/lib/assets/title-separator.png'

interface TitleWithSeparatorProps {
    title: string;
}

export const TitleWithSeparator: FC<TitleWithSeparatorProps> = ({title}) => {
    return (
        <div className={classes.titleWithSeparator}>
            <div className={classes.title}>
                    <span>{title}</span>
            </div>
            <div className={classes.separator}>
                <img src={separator.src} />
            </div>
        </div>
    )
}