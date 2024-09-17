import React, { ComponentProps, FC, PropsWithChildren  } from "react";
import classes from './myButton.module.scss'
import { MyLoader } from "../myLoader/MyLoader";
import check from '@/src/shared/lib/assets/check-circle.png'
import cursorClick from '@/src/shared/lib/assets/cursor-click.png'


interface MyButtonProps {
    isLoading?: boolean;
    success?: boolean;
    error?: string;
}


export const MyButton: FC<PropsWithChildren<ComponentProps<"button"> & MyButtonProps>> = ({children, isLoading = false, error = '', success = false, ...props}) => {
    

    return (
        <div className={classes.buttonBox}>
            <button disabled={isLoading || Boolean(error)} className={classes.myButton} {...props}>
            
                <div className={classes.status}>
                    {!isLoading && !success && <img src={cursorClick.src} />}
                    { isLoading && <MyLoader /> }
                    { success && <img src={check.src} /> }
                </div>
                {children}
            </button>
            <div className={classes.error}>{error && '*'}{error}</div>
        </div>
    )
}