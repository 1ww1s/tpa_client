import { FC } from "react";
import { ContactBoxes } from "@/src/widgets/contactBoxes";
import classes from './contacts.module.scss'
import { PageTitle } from "@/src/widgets/pageTitle";
import { Map } from "@/src/widgets/map";

export const Contacts: FC = () => {
    return (
        <div>
            <PageTitle title="КОНТАКТНАЯ ИНФОРМАЦИЯ" image='Панель управления' />
            <div className={classes.contacts}>
                <div className="wrapper">
                    <ContactBoxes />
                </div>
                <Map />
            </div>
        </div>
    )
}