import React, { FC, PropsWithChildren } from "react";
import classes from './myTable.module.scss'


interface MyTableProps {
    columns: string[];
    tbody: React.ReactNode
}

 
export const MyTableAdmin: FC<MyTableProps> = ({columns, tbody}) => {

    return (
        <table className={classes.myTable}>
            <thead>
                <tr>
                    {columns.map((c, ind) => 
                        <th key={ind}>{c}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {tbody}
            </tbody>
    </table>
    )
}