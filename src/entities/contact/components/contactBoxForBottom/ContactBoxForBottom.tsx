import { FC } from "react";
import { IContact } from "../../model/types";
import tele from '../../lib/assets/tele.png'
import mail from '../../lib/assets/mail.png'
import marker from '../../lib/assets/marker.png'
import clock from '../../lib/assets/clock.png'
import classes from './contactBox.module.scss'

interface ContactBoxProps {
    contact: IContact;
}

export const ContactBoxForBottom: FC<ContactBoxProps> = ({contact}) => {

    const chooseImg = (title: IContact['title']) => {
        let imgSrc: string
        if(title === 'Телефон'){
            imgSrc = tele.src;
        }
        else if(title === 'E-mail'){
            imgSrc = mail.src;
        }
        else if(title === 'Часы работы'){
            imgSrc = clock.src;
        }
        else{
            imgSrc = marker.src;
        }
        return imgSrc
    }

    const imgSrc = chooseImg(contact.title)

    return(
        <div className={classes.contactCard}>
            <div className={classes.icon}>
                <div className={classes.imgDiv}>
                    <img src={imgSrc} alt={contact.title} />
                </div>
                <span>{contact.description}</span>
            </div>
        </div>
    )
}