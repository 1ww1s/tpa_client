import { ContactBox, contacts } from "@/src/entities/contact";
import { FC } from "react";
import classes from './contactBoxes.module.scss'



export const ContactBoxes: FC = () => {


    return (
        <div className={classes.connection}>
            <h2>Всегда на связи</h2>
            <div className={classes.contactBoxes}>
                {contacts.map(contact => 
                    <ContactBox key={contact.title} contact={contact} />
                )}
            </div>
        </div>
    )
}