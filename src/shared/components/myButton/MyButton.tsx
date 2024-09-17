import React, { ComponentProps, FC, PropsWithChildren  } from "react";
import classes from './myButton.module.scss'






export const MyButton: FC<PropsWithChildren<ComponentProps<"button">>> = ({children, ...props}) => {

    return (
        <div className={classes.buttonBox}>
            <button className={classes.myButton} {...props}>
                {children}
            </button>
        </div>
    )
}