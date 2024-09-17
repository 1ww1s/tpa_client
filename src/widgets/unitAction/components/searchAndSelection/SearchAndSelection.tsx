import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useState } from "react";
import { IProductGroup, productGroupService } from "@/src/entities/productGroup";
import { GetDataByName } from "@/src/features/getDataByName";
import { IUnit, unitService } from "@/src/entities/unit";

interface SearchProps {
    setUnit: (unit: IUnit) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    selectedWidget: number;
}


export const SearchAndSelection: FC<SearchProps> = ({isLoading, setIsLoading, setUnit, selectedWidget, setSelectedWidget}) => {
   
    const [units, setUnits] = useState<IUnit[]>([])

    const onSelected = async (selected: IUnit) => {
        setUnit(selected)
        setSelectedWidget(selectedWidget + 1)
    }

    return (
        <div>
            <h3>Найти единицу измерения</h3>
            <GetDataByName 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                getData={async (value: string) => await unitService.getArrayByValue(value)}
                setItems={setUnits}
            />
            <hr />
            <div>
                <SelectFromList 
                    items={units}
                    field={'value'}
                    onSelected={onSelected}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}