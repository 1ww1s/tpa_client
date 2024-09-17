import React, { FC } from 'react';
import classes from './loaderSpinner.module.scss'

export const LoaderSpinner: FC = ({...props}) => {

    
    
    return (
        <div {...props} className={classes.loader}>
            
        </div>
    )
}
