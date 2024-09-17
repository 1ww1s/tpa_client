import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useEffect, useMemo, useState } from "react";
import { SearchByName } from "@/src/features/searchByName";
import { IPartner, partnerService } from "@/src/entities/partner";

interface SearchProps {
    setPartner: (partner: IPartner) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}


export const SearchAndSelection: FC<SearchProps> = ({setPartner, selectedWidget, setSelectedWidget}) => {
   
    const [partners, setPartners] = useState<IPartner[]>([])
    const [partnersSearch, setPartnersSearch] = useState<IPartner[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const onSelected = async (selected: IPartner) => {
        setPartner(selected)
        setSelectedWidget(selectedWidget + 1)
    }

    const getPartners = async () => {
        try{    
            setIsLoading(true)
            const partners = await partnerService.getAll()
            setPartners(partners)
            setPartnersSearch(partners)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPartners()
    }, [])

    return (
        <div>
            <h3>Найти партнера</h3>
            <div>
                <SearchByName 
                    items={partners}
                    setItems={setPartnersSearch}
                    field={'name'}
                />
            </div>
            <hr />
            <div>
                <SelectFromList 
                    items={partnersSearch}
                    field={'name'}
                    onSelected={onSelected}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}