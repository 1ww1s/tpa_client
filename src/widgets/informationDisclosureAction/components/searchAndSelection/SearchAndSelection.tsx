import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useState } from "react";
import { IProductGroup, productGroupService } from "@/src/entities/productGroup";
import { GetDataByName } from "@/src/features/getDataByName";
import { IInformationDisclosure, informationDisclosureService } from "@/src/entities/informationDisclosure";

interface SearchProps {
    setInformationDisclosure: (informationDisclosure: IInformationDisclosure) => void;
    isLoading: boolean; 
    setIsLoading: (isLoading: boolean) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
    action: "create" | "update" | "delete"
}


export const SearchAndSelection: FC<SearchProps> = ({action, isLoading, setIsLoading, setInformationDisclosure, selectedWidget, setSelectedWidget}) => {
   
    const [items, setItems] = useState<{name: string}[]>([])

    const onSelected = async (selected: {name: string}) => {
        try{
            setIsLoading(true)
            if(action === 'delete'){
                const data = await informationDisclosureService.getByName(selected.name)
                setInformationDisclosure({id: data.id, name: data.name, files: []})
            }
            else{
                const data = await informationDisclosureService.getByName(selected.name)
                setInformationDisclosure(data)
            }
            setSelectedWidget(selectedWidget + 1)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h3>Найти раздел продукции</h3>
            <GetDataByName 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                getData={async (name: string) => await informationDisclosureService.getArrayByName(name)}
                setItems={setItems}
            />
            <hr />
            <div>
                <SelectFromList 
                    items={items}
                    field={'name'}
                    onSelected={onSelected}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}