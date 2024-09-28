"use client"

import { contacts } from "@/src/entities/contact"
import classes from './navbar.module.scss'
import { CallUs, NavigationMobile } from "@/src/entities/navigation"
import { NavigationDesktop } from "@/src/entities/navigation"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { SiteSearch } from "@/src/features/siteSearch"
import { IProductItem } from "@/src/entities/product"
import { usePathname } from "next/navigation";
import { Burger } from "@/src/features/burger"



export const Navbar: FC<PropsWithChildren> = ({children}) => {
    
    const [items, setItems] = useState<IProductItem[]>([])
    const [open, setOpen] = useState<boolean>(false)

    const pathname = usePathname()
    if(pathname === '/login' || pathname === '/registration') return <></>


    useEffect(() => {
        closeMenu()
    }, [pathname])

    const closeMenu = () => {
        setOpen(false)
    }

    return (
        <div className={classes.Navbar}>
            <div className={classes.callUs}>
                <CallUs 
                    contactEmail={contacts.find(c => c.title === 'E-mail')} 
                    contactTelephone={contacts.find(c => c.title === 'Телефон')} 
                />
            </div>
            <div className={classes.burger}>
                <Burger open={open} setOpen={setOpen} />
            </div>
            <div className={classes.navigationMobile}>
                <NavigationMobile open={open} />
            </div>
            <div onClick={closeMenu} className={open ? classes.darken + ' ' + classes.open : classes.darken}></div>
            <div className={classes.navigationDesktop}>
                <NavigationDesktop 
                    items={items}
                >
                    <SiteSearch setItems={setItems} />
                </NavigationDesktop>
            </div>
        </div>
    )
}