import Link from "next/link";
import { FC } from "react";
import { IBreadcrumb } from "../model/types";
import classes from './breadcrumbs.module.scss'

interface IProps {
    breadcrumbs: IBreadcrumb[]
}

export const Breadcrumbs: FC<IProps> = ({breadcrumbs}) => {

    return (
        <nav className={classes.breadcrumbs}>
            <ul className={classes.list}>
                {/* <li>
                    <Link href="/" className="text-blue-600 hover:underline">Главная</Link>
                </li> */}
                {breadcrumbs.map((item, index) => (
                    <li key={item.path} className={classes.breadcrumb}>
                        {
                            index !== 0
                                &&
                            <span className={classes.separator}>/</span>
                        }
                        {
                            index === breadcrumbs.length - 1 
                                ?
                            <span className={classes.label}>{item.label}</span>
                                :
                            <Link href={item.path} className={classes.link}>
                                {item.label}
                            </Link>
                        }
                    </li>
                ))}
            </ul>
        </nav>
    )
}