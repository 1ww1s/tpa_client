import { FC } from "react";
import classes from './clickOnButton.module.scss'
import { MyButton } from "@/src/shared/components/myButton/MyButton";
import { MyLink } from "@/src/shared/components/myLink/MyLink";

interface ClickOnButtonProps {
    link: string;
    title: string;
}

export const ClickOnButton: FC<ClickOnButtonProps> = ({title, link}) => {
    
    return (
        <MyLink className={classes.link} href={link}>
            <MyButton><span className={classes.text}>{title}</span></MyButton>
        </MyLink>
    )
}