import { FC, PropsWithChildren } from "react";
import classes from './clickOnLink.module.scss'
import { MyLink } from "@/src/shared/components/myLink/MyLink";

interface ClickOnLinkProps {
    href: string;
}

export const ClickOnLink: FC<ClickOnLinkProps & PropsWithChildren> = ({href, children}) => {

    return (
        <MyLink className={classes.link} href={href}>
            {children}
        </MyLink>
    )
}