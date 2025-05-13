import { FC } from "react";
import classes from './nav.module.scss'
import hrImg from '@/src/shared/lib/assets/hr.png'
import { getSectionList, navigation, TSection } from "@/src/entities/navigation";
import { MyLink } from "@/src/shared/components/myLink/MyLink";


export const Nav: FC = () => {

    const getSections = getSectionList()
    const sections = getSections(navigation)

    return (
        <div className={classes.nav}>
            <h3>НАВИГАЦИЯ</h3>
            <img className={classes.hrImg} src={hrImg.src} alt="Разделитель" /> 
            <ul className={classes.links}>
                {sections.map((s, i) =>
                    <li key={i}>
                        <MyLink href={process.env.NEXT_PUBLIC_CLIENT_URL + s.link}>
                            {s.name.toLocaleUpperCase()}
                        </MyLink>
                    </li>
                )}
            </ul>
        </div>
    )
}