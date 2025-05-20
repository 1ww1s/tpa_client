import { FC } from "react";
import classes from './arrows.module.scss'
import arrow from '@/src/shared/lib/assets/arrow-down.png'

interface IProps {
    refBackward: React.RefObject<HTMLImageElement>;
    refForward: React.RefObject<HTMLImageElement>;
}

export const Arrows: FC<IProps> = ({refBackward, refForward}) => {


    return (
        <div className={classes.switch}>
            <img ref={refBackward} className={classes.backward} src={arrow.src} alt="Назад" />
            <img ref={refForward} className={classes.forward} src={arrow.src} alt="Вперед" />
        </div>
    )
}