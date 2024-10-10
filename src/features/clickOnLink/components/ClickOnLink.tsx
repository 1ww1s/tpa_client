"use client"

import { FC, PropsWithChildren } from "react";
import classes from './clickOnLink.module.scss'
import { MyLink } from "@/src/shared/components/myLink/MyLink";
import Link from "next/link";

interface ClickOnLinkProps {
    href: string;
}

export const ClickOnLink: FC<ClickOnLinkProps & PropsWithChildren> = ({href, children}) => {

    // вместо Link был MyLink

    return (
        <Link className={classes.link} href={href}>  
            {children}
        </Link>
    )
}