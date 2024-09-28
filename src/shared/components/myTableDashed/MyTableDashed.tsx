import { FC } from "react";
import classes from './myTableDashed.module.scss'

interface MyTableDashedProps {
    rows: (string | number)[][];
    columns: string[];
}

export const MyTableDashed: FC<MyTableDashedProps> = ({rows, columns}) => {

    return (
        <div className={classes.myTableDashed}>
            <ul >
                <li className={classes.title}>
                    {columns.map((c, ind) =>
                            <span data-cell key={ind}>
                                <span data-value>
                                    {c}
                 
                                </span>
                            </span>
                    )}
                </li>
                {rows.map((rs, ind) => 
                    <li key={ind}>
                        {rs.map((r, i) => 
                                <span data-cell key={i}>
                                    <span data-value>
                                        {r}
                                        { i !== (rs.length - 1) &&  <span data-dashed></span> }  
                                    </span>
                                </span>
                        )}
                    </li>
                )}
        </ul>
        </div>
    )
}


