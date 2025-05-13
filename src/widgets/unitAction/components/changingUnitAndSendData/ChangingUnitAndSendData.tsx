import { IUnit, unitService, validationUnit } from "@/src/entities/unit";
import { ChangingUnit } from "@/src/features/changingUnit";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { FC } from "react";

interface ChangingUnitAndSendDataProps {
    unit: IUnit;
    setUnit: (unit: IUnit) => void;
    action: 'create' | 'update' | 'delete';    
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    selectedWidget: number;
    setSelectedWidget: (selectedWidget: number) => void;
    title: string;
}


export const ChangingUnitAndSendData: FC<ChangingUnitAndSendDataProps> = (
    {unit, setUnit, action, isLoading, setIsLoading, selectedWidget, setSelectedWidget, title}) => {

    return (
        <div>
            <h3>{title}</h3>
            <ChangingUnit 
                unit={unit}
                setUnit={setUnit}
            />
            <hr />
            <SendDetailedData 
                action={action}
                validation={setError => validationUnit(unit, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={async () => action === 'create' ? await unitService.create(unit.value) : await unitService.update(unit)}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}