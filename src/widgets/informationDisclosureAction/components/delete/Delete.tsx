import { FC } from "react";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { IInformationDisclosure, informationDisclosureService } from "@/src/entities/informationDisclosure";

interface DeleteProps {
    informationDisclosure: IInformationDisclosure;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const Delete: FC<DeleteProps> = ({informationDisclosure, selectedWidget, setSelectedWidget, isLoading, setIsLoading}) => {
    

    return (
        <div>
            <h3>Удалить раздел раскрытия информации</h3>
            <h3>Название</h3>
            <p>{informationDisclosure.name}</p>
            <hr />
            <div>
                <SendDetailedData 
                    onEnd={() => setSelectedWidget(selectedWidget + 1)} 
                    action='delete'
                    isLoading={isLoading} 
                    setIsLoading={setIsLoading} 
                    sendData={async () => await informationDisclosureService.delete(informationDisclosure.id || 0)}
                />
            </div>
        </div>
    )
}