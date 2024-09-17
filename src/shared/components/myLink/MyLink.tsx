"use client"

import { useLoadingAcions } from "@/src/entities/loadingAction";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, HTMLProps, MouseEvent, PropsWithChildren, useEffect, useState,  } from "react";
import { LoadingLink } from "../loadingLink/LoadingLink";
import { LoadingScreen } from "../loadingScreen/LoadingScreen";


interface MyLinkProps {
    href: string;
}

export const MyLink: FC<MyLinkProps & PropsWithChildren & HTMLProps<HTMLAnchorElement>> = ({href, children, ...props}) => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {setLoadingAction} = useLoadingAcions()
    const click = (e: MouseEvent, link: string) => {
        e.preventDefault()
        setLoadingAction(true)
        router.push(link)
    }

    useEffect(() => {
        setLoadingAction(false)
    }, [pathname, searchParams])


    return (
        <>
            <Link onClick={e => click(e, href)} href={href} {...props}>{children}</Link>
        </>
    )
}