"use client"

import { FC, PropsWithChildren, useEffect, useState } from "react";
import classes from './navbar.module.scss'
import Link from "next/link";
import { sections } from "../model/types";
import { IProductItem } from "../../product";
import { MyLink } from "@/src/shared/components/myLink/MyLink";

interface NavigationProps {
    items: IProductItem[];
}


export const Navigation: FC<NavigationProps & PropsWithChildren> = ({items, children}) => {

    return (
        <div className={classes.Navigation}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <nav>
                        <ul>
                            {sections.sections.map((section, ind) => 
                                <li key={ind} className={section.children && classes.dropdown}>
                                    <MyLink href={section.link}>{section.name}</MyLink>
                                    {   
                                        section.children 
                                            && 
                                        <ul>
                                            <div className={classes.hr}></div>
                                            {section.children.sections.map((s, ind) => 
                                                <MyLink key={ind} href={s.link}><li>{s.name}</li></MyLink>
                                            )}
                                        </ul>
                                    }
                                </li>
                            )}
                        </ul>
                    </nav>
                    {/* <div className={classes.search}>
                        {children}
                        <ul style={{opacity: '1'}}>
                            <div className={classes.hr}></div>
                                {items.map(i => 
                                    <Link href={i.slug}><li>{i.name}</li></Link>
                                )}
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    )
}