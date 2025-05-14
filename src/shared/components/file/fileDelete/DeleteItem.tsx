import { FC } from 'react';
import classes from './deleteItem.module.scss'
import close from '@/src/shared/lib/assets/x-close.png'

interface IProps {
    onClick: () => void;
}

export const DeleteItem: FC<IProps> = ({onClick}: IProps) => {

    return (
        <div onClick={onClick} className={classes.deleteImgList}>
            <img src={close.src} alt="удалить" />
        </div>
    )
}