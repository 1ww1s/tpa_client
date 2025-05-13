import { FC } from "react";
import classes from './callUs.module.scss'
import { IContact } from "@/src/entities/contact";
import Link from "next/link";
import logo from '@/src/shared/lib/assets/logo.png'
import mail from '@/src/shared/lib/assets/mail.png'
import tele from '@/src/shared/lib/assets/phone-call.png'
import Image from "next/image";
import { HOME_ROUTE } from "../../model/links";

interface CallUsProps {
    contactEmail: IContact | undefined;
    contactTelephone: IContact | undefined;
}

export const CallUs: FC<CallUsProps> = ({contactEmail, contactTelephone}) => {

    return (
        <div className={classes.CallUs}>
            <div className="wrapper">
                <div className={classes.content}>
                    <div className={classes.title}>
                        <Link href={HOME_ROUTE}><Image src={logo.src} width={80} height={40} alt="Логотип" /></Link>
                        <p><Link href={HOME_ROUTE}>АО “ПФК Тверьпромавтоматика”</Link></p>
                    </div>
                    <div className={classes.contacts}>
                        <div className={classes.email}>
                            <Image src={mail.src} width={16} height={16} alt="Email" />
                            <span>{contactEmail?.description}</span>
                        </div>
                        <div className={classes.telephone}>
                            <Image src={tele.src} width={16} height={16} alt="Телефон" />
                            <span>{contactTelephone?.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}