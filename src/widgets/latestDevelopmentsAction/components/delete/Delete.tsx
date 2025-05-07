import { FC } from "react";
import classes from './delete.module.scss'
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { ILatestDevelopment, LatestDevelopmentCard, latestDevelopmentsService } from "@/src/entities/latestDevelopment";

interface DeleteProps {
    latestDevelopment: ILatestDevelopment;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const Delete: FC<DeleteProps> = ({latestDevelopment, selectedWidget, setSelectedWidget, isLoading, setIsLoading}) => {
    

    return (
        <div className={classes.delete}>
            <h3>Удалить последнюю разработку</h3>
            <div className={classes.prev}>
                <LatestDevelopmentCard latestDevelopment={latestDevelopment} />
            </div>
            <div className={classes.send}>
                <SendDetailedData 
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                    action='delete'
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    sendData={async () => await latestDevelopmentsService.delete(latestDevelopment.id || 0)}
                />
            </div>
        </div>
    )
}