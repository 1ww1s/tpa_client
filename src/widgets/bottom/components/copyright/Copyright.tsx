import { FC } from "react";
import classes from './copyright.module.scss'


export const Copyright: FC = () => {


    return (
        <section className={classes.copyright}>
            2025 © АО “ПФК Тверьпромавтоматика”
        </section>
    )
}