import { ClickOnButton } from "@/src/features/clickOnButton";
import { FC } from "react";
import classes from './notFound.module.scss'


export const NotFound: FC = () => {


    return (
        <div className={classes.NotFound}>
            <div className="wrapper">
                <div className={classes.content}>
                    <span>404</span>
                    <h2>По вашему запросу ничего не найдено</h2>
                    <div className={classes.button}>
                        <ClickOnButton title="Перейти в каталог" link={process.env.NEXT_PUBLIC_CLIENT_URL + '/product-catalog'} />
                    </div>
                </div>
            </div>
        </div>
    )
}