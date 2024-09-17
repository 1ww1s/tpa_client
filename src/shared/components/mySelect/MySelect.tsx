import { ComponentProps, FC, PropsWithChildren } from "react";
import classes from './mySelect.module.scss'

interface MySelectProps {
    defaultValue: string;
    value: string;
    change: (value: string) => void;
    options: {value: string, name: string}[]
}

export const MySelect: FC<PropsWithChildren<ComponentProps<"select"> & MySelectProps>> = ({defaultValue, value, change, options, ...props}) => {
    return (

        
        <select
              
            className={classes.select} 
            value={value} 
            onChange={(e) => {change(e.target.value)}}
            {...props}
        >
                <option className={classes.option} disabled value="">{defaultValue}</option>
                {options.map(option => 
                    <option className={classes.option} key={option.value} value={option.value}> 
                        {option.name} 
                    </option>    
                )}
        </select>
    )
}