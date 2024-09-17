import { FC } from "react";
import classes from './myTable.module.scss'

type T = string | number;

interface MyTableProps {
    columns: string[];
    rows: T[][]
}

export const MyTable: FC<MyTableProps> = ({columns, rows}) => {
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
                {rows.map((rs, ind) => 
                    <tr key={ind}>
                        {rs.map((r, i) => 
                            <td key={i}>{r}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}