"use client"

import { contacts } from "@/src/entities/contact"
import classes from './navbar.module.scss'
import { CallUs } from "@/src/entities/navigation"
import { Navigation } from "@/src/entities/navigation"
import { FC, PropsWithChildren, useState } from "react"
import { SiteSearch } from "@/src/features/siteSearch"
import { IProductItem } from "@/src/entities/product"
import { usePathname } from "next/navigation";



export const Navbar: FC<PropsWithChildren> = ({children}) => {
    
    const [items, setItems] = useState<IProductItem[]>([])

    const pathname = usePathname()
    if(pathname === '/login' || pathname === '/registration') return <></>

    return (
        <div className={classes.Navbar}>
            <CallUs contactEmail={contacts.find(c => c.title === 'E-mail')} contactTelephone={contacts.find(c => c.title === 'Телефон')} />
            <Navigation 
                items={items}
            >
                <SiteSearch setItems={setItems} />
            </Navigation>
        </div>
    )
}