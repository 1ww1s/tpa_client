import { FC } from "react";
import classes from './selectFromList.module.scss'
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";

interface SelectFromListProps<T> {
    items: T[];
    field: keyof T;
    onSelected: (selected: T) => void;
    isLoading?: boolean;
}


export const SelectFromList = <T,>(props: SelectFromListProps<T>) => {

    const select = (selectedItem: T) => {
        props.onSelected(selectedItem)
    }

    return (
         <div className={classes.list}>
                { props.isLoading && <LoaderDiv /> }
                { 
                    (!props.isLoading) 
                        && 
                    <ul>
                        {props.items?.map((item, ind) => 
                            <li onClick={() => select(item)} key={ind}>{item?.[props.field] as string}</li>
                        )}
                    </ul>
                }
            </div>
    )
}