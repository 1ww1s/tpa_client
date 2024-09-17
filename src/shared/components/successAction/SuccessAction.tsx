import { FC } from "react";
import success from '../../lib/assets/check-circle-broken.png'
import classes from './successAction.module.scss'

interface SuccessActionProps {
    title: string;
}

export const SuccessAction: FC<SuccessActionProps> = ({title}) => {
    return (
        <div className={classes.successAction}>
            <img src={success.src} />
            <span>{title}</span>
        </div>
    )
}