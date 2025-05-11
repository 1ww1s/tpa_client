"use client"

import { FC } from "react";
import classes from './navigationMobile.module.scss'
import { MyLink } from "@/src/shared/components/myLink/MyLink";
import { getSectionList, navigation } from "../..";
import { usePathname } from "next/navigation";

interface NavigationMobileProps{
    open: boolean;
}

export const NavigationMobile: FC<NavigationMobileProps> = ({open=false}) => {

    const getSections = getSectionList()
    const sections = getSections(navigation)

    const pathname = usePathname()

    return (
        <div className={classes.navigationMobile}>
            <div className={open ? classes.navigation + ' ' + classes.open : classes.navigation}>
                <nav>
                    <ul className={classes.links}>
                        {sections.map((s, i) =>
                            <li 
                                key={i} 
                                className={((s.link === pathname) || ((s.link !== '/') && pathname.includes(s.link))) ? classes.highlight : ''}
                            >
                                <MyLink href={process.env.NEXT_PUBLIC_CLIENT_URL + s.link}>
                                    {s.name.toLocaleUpperCase()}
                                </MyLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    )
}