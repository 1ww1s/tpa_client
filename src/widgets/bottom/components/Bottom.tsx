"use client"

import classes from './bottom.module.scss'
import { About } from "./about/About"
import { Contacts } from "./contacts/Contacts"
import { Info } from "./info/Info"
import { usePathname } from "next/navigation";
import { Nav } from './nav/Nav'
import { Copyright } from './copyright/Copyright'


export function Bottom() {
    
    const pathname = usePathname()
    if(pathname === '/login' || pathname === '/registration') return <></>


    return (
        <div className={classes.Bottom}>
            <div className="wrapper">
                <div className={classes.content}>
                    <About />
                    <Nav />
                    {/* <Info /> */}
                    <Contacts />
                </div>
                <hr className={classes.hr} />
                <Copyright />
            </div>
        </div>
    )
}