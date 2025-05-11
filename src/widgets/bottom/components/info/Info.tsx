import { FC } from "react";
import classes from './info.module.scss'
import hrImg from '@/src/shared/lib/assets/hr.png'
import Link from "next/link";

export const Info: FC = () => {


    return (
        <div className={classes.info}>
            <h3>ИНФОРМАЦИЯ</h3>
            <img 
                className={classes.hrImg} 
                src={hrImg.src} 
                alt="Разделитель" 
            /> 
            <ul className={classes.links}>
                <li>
                    <Link href={process.env.NEXT_PUBLIC_CLIENT_URL + '/certificates'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    <span>Сертификаты</span>
                    </Link>
                </li>
                <li>
                    <Link href={process.env.NEXT_PUBLIC_CLIENT_URL + '/about'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    <span>О компании</span>
                    </Link>
                </li>
                <li>
                    <Link href={process.env.NEXT_PUBLIC_CLIENT_URL + '/requisites'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    <span>Реквизиты</span>
                    </Link>
                </li>
                <li>
                    <Link href={process.env.NEXT_PUBLIC_CLIENT_URL + '/information'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    <span>Раскрытие информации</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}