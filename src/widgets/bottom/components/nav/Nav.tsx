import { FC } from "react";
import classes from './nav.module.scss'
import hrImg from '@/src/shared/lib/assets/hr.png'
import { navigation, TSection } from "@/src/entities/navigation";
import { MyLink } from "@/src/shared/components/myLink/MyLink";


export const Nav: FC = () => {

    let sections: {link: string, name: string}[] = [];

    const getSections = (nav: TSection) => {
        nav.sections.map(s => {
            if(s.children){
                return getSections(s.children)
            }
            sections.push({link: s.link, name: s.name})
        })
    }
    getSections(navigation)

    return (
        <div className={classes.nav}>
            <h3>НАВИГАЦИЯ</h3>
            <img className={classes.hrImg} src={hrImg.src} /> 
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