import { FC } from "react";
import classes from './auth.module.scss'
import { FormAuth } from "@/src/features/formAuth";

export const Auth: FC = () => {

    return (
        <div className={classes.auth}>
            <FormAuth />
        </div>
    )
}