import { FC } from "react";
import classes from './about.module.scss'
import logo from '@/src/shared/lib/assets/logo.png'

export const About: FC = () => {
    return (
        <div className={classes.About}>
            <img src={logo.src} />
            <p>
                АО “ПФК Тверьпромавтоматика” занимается разработкой и производством систем управления и автоматики 
                судовых и стационарных дизель-генераторов, систем управления судовыми главными двигателями, 
                щитов автоматики и различного электронного оборудования.
            </p>
        </div>
    )
}