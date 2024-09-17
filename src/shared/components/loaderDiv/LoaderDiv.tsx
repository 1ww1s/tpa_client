import React, { Children, FC, PropsWithChildren } from "react";
import classes from './loaderDiv.module.css'

interface LoaderDivProps {
    height?: number;
}

export const LoaderDiv: FC<LoaderDivProps & PropsWithChildren> = ({height, children, ...props}) => {
    return (
        <div {...props} className={classes.container} style={{height: height}}>
            {children}
        </div>
    )
}