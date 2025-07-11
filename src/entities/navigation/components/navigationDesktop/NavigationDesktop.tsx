"use client"

import { FC, PropsWithChildren } from "react";
import classes from './navbar.module.scss'
import { sections } from "../../model/types";
import { IProductItem } from "../../../product";
import { MyLink } from "@/src/shared/components/myLink/MyLink";

interface NavigationDesktopProps {
    items: IProductItem[];
}

export const NavigationDesktop: FC<NavigationDesktopProps & PropsWithChildren> = ({items, children}) => {

    // const [dropdown, setDropdown] = useState<boolean>(false)

    return (
        <div className={classes.Navigation}>
            <div className="wrapper">
                <div className={classes.content}>
                    <nav>
                        <ul>
                            {sections.sections.map((section, ind) => 
                                <li key={ind} className={section.children && classes.dropdown}>
                                    <MyLink className={classes.mainA} href={section.link}>{section.name}</MyLink>
                                    {   
                                        section.children 
                                            &&
                                        <ul>
                                            {section.children.sections.map((s, ind) => 
                                                <li key={ind}><MyLink className={classes.dropdownA} href={s.link}>{s.name}</MyLink></li>
                                            )}
                                        </ul>
                                    }
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}