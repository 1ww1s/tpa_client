import { IRequisite, requisiteService, useRequisiteActions, validationRequisite } from "@/src/entities/requisite";
import { ChangingRequisite } from "@/src/features/changingRequisite";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { FC } from "react";

interface ChangingRequisiteAndSendDataProps {
    requisite: IRequisite;
    setRequisite: (requisite: IRequisite) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}


export const ChangingRequisiteAndSendData: FC<ChangingRequisiteAndSendDataProps> = (
    {requisite, setRequisite, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget, title}) => {

    const {setName} = useRequisiteActions(requisite, setRequisite)
    const {setValue} = useRequisiteActions(requisite, setRequisite)

    return (
        <div>
            <h3>{title}</h3>
            <ChangingRequisite 
                requisite={requisite}
                setName={setName}
                setValue={setValue}
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationRequisite(requisite, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={async () => action === 'create' ? await requisiteService.create(requisite) : await requisiteService.update(requisite)}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}