import { FC } from "react";
import classes from './contactBox.module.scss'
import marker from '../../lib/assets/marker.png'
import markerWhite from '../../lib/assets/markerWhite.png'
import tele from '../../lib/assets/tele.png'
import teleWhite from '../../lib/assets/teleWhite.png'
import mail from '../../lib/assets/mail.png'
import mailWhite from '../../lib/assets/mailWhite.png'
import clock from '../../lib/assets/clock.png'
import clockWhite from '../../lib/assets/clockWhite.png'
import { IContact } from "../../model/types";

interface ContactBoxProps {
    contact: IContact;
}

export const ContactBox: FC<ContactBoxProps> = ({contact}) => {

    const chooseImgs = (title: IContact['title']) => {
        let imgs: {img: string, imgWhite: string} = {img: '', imgWhite: ''};
        if(title === 'Телефон'){
            imgs.img = tele.src;
            imgs.imgWhite = teleWhite.src;
        }
        else if(title === 'E-mail'){
            imgs.img = mail.src;
            imgs.imgWhite = mailWhite.src;
        }
        else if(title === 'Часы работы'){
            imgs.img = clock.src;
            imgs.imgWhite = clockWhite.src;
        }
        else{
            imgs.img = marker.src;
            imgs.imgWhite = markerWhite.src;
        }
        return imgs
    }

    const imgs = chooseImgs(contact.title)

    return (
        <div className={classes.contactBox}>
        {
            <div className={classes.imgDiv}>
                <img className={classes.img} src={imgs.img} alt={contact.title} />
                <img className={classes.imgWhite} src={imgs.imgWhite} alt={contact.title} />
            </div>
        }
            <span data-title>{contact.title}:</span>
            <span data-description>{contact.description}</span>
        </div>
    )
}