import { FC } from "react";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { IRequisite, RequisitePreview, requisiteService } from "@/src/entities/requisite";
import classes from './delete.module.scss'

interface DeleteProps {
    requisite: IRequisite;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const Delete: FC<DeleteProps> = ({requisite, selectedWidget, setSelectedWidget, isLoading, setIsLoading}) => {
    

    return (
        <div className={classes.delete}>
            <h3>Удалить реквизит</h3>
            <RequisitePreview requisite={requisite} />
            <hr />
            <div>
                <SendDetailedData 
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                    action='delete'
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    sendData={async () => await requisiteService.delete(requisite.id)}
                />
            </div>
        </div>
    )
}