import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useState } from "react";
import { IProductGroup, productGroupService } from "@/src/entities/productGroup";
import { GetDataByName } from "@/src/features/getDataByName";

interface SearchProps {
    setProductGroup: (productGroup: IProductGroup) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    selectedWidget: number;
}


export const SearchAndSelection: FC<SearchProps> = ({isLoading, setIsLoading, setProductGroup, selectedWidget, setSelectedWidget}) => {
   
    const [productsGroup, setProductsGroup] = useState<IProductGroup[]>([])

    const onSelected = async (selected: IProductGroup) => {
        setProductGroup(selected)
        setSelectedWidget(selectedWidget + 1)
    }

    return (
        <div>
            <h3>Найти раздел продукции</h3>
            <GetDataByName 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                getData={async (title: string) => await productGroupService.getArrayByTitle(title)}
                setItems={setProductsGroup}
            />
            <hr />
            <div>
                <SelectFromList 
                    items={productsGroup}
                    field={'title'}
                    onSelected={onSelected}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}