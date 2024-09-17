import { FC } from "react";
import classes from '../bottom.module.scss'
import { ContactBoxForBottom, contacts } from "@/src/entities/contact";
import hrImg from '@/src/shared/lib/assets/hr.png'


export const Contacts: FC = () => {

    return (
        <div>
            <h3>КОНТАКТЫ</h3>
            <img className={classes.hrImg} src={hrImg.src} /> 
            {contacts.map(c => 
                <ContactBoxForBottom key={c.title} contact={c} />
            )}
        </div>
    )
}