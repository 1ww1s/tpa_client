import { FC } from "react";
import classes from './requisitePreview.module.scss'
import { IRequisite } from "../../model/types";

interface RequisitePreviewProps {
    requisite: IRequisite;
}

export const RequisitePreview: FC<RequisitePreviewProps> = ({requisite}) => {

    

    return (
        <div className={classes.requisitePreview}>
            <span>{requisite.name}</span><span>{requisite.value}</span>
        </div>
    )
}