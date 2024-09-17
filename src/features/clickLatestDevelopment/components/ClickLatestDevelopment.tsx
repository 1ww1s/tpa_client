import { ILatestDevelopment } from "@/src/entities/latestDevelopment";
import Image from "next/image";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import classes from './clickLatestDevelopment.module.scss'
import { MyLink } from "@/src/shared/components/myLink/MyLink";

interface ClickLatestDevelopmentProps {
    latestDevelopmentPreview: ILatestDevelopment;
}

export const ClickLatestDevelopment: FC<ClickLatestDevelopmentProps & PropsWithChildren> = ({latestDevelopmentPreview, children}) => {

    return (
        <MyLink className={classes.link} href={process.env.NEXT_PUBLIC_CLIENT_URL + '/product-catalog/' + latestDevelopmentPreview.slug}>
            {children}
        </MyLink>
    )
}