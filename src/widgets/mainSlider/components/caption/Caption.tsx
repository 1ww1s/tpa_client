import { FC, PropsWithChildren, ReactElement } from "react";
import classes from './caption.module.scss'

interface CaptionProps {
    children: ReactElement
}

export const Caption: FC<CaptionProps> = ({children}) => {
    return (
        <div className={classes.caption}>
            <div className="wrapper">
                <div className={classes.title}>
                    <span>Разработка и производство</span>
                </div>
                <div className={classes.sign}>
                    <span>систем управления и автоматики судовых дизелей, систем ДАУ ГД, электронного и щитового оборудования</span>
                </div>
                <div className={classes.action}>
                    {children}
                </div>
            </div>
        </div>
    )
}