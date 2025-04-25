import { FC } from "react";
import classes from './empty.module.scss'
import { ClickOnButton } from "@/src/features/clickOnButton";


export const Empty: FC = () => {

    return (
        <div className={classes.empty}>
                <div className={classes.content}>
                    <h2>В этом разделе ничего не найдено</h2>
                    <div className={classes.button}>
                        <ClickOnButton title="Перейти в каталог" link={process.env.NEXT_PUBLIC_CLIENT_URL + '/product-catalog'} />
                    </div>
            </div>
        </div>
    )
}