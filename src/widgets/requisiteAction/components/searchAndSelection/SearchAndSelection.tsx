import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useEffect, useState } from "react";
import classes from './searchAndSelection.module.scss'
import { SearchByName } from "@/src/features/searchByName";
import { IRequisite, requisiteService } from "@/src/entities/requisite";

interface SearchProps {
    setRequisite: (requisite: IRequisite) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}


export const SearchAndSelection: FC<SearchProps> = ({setRequisite, selectedWidget, setSelectedWidget}) => {
   
    const [requisitesInitial, setRequisitesInitial] = useState<IRequisite[]>([])
    const [requisitesSearch, setRequisitesSearch] = useState<IRequisite[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const onSelected = async (selected: IRequisite) => {
        setRequisite(selected)
        setSelectedWidget(selectedWidget + 1)
    }

    const getRequisites = async () => {
        try{    
            setIsLoading(true)
            const requisites = await requisiteService.getAll()
            console.log(requisites)
            setRequisitesInitial(requisites)
            setRequisitesSearch(requisites)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getRequisites()
    }, [])

    return (
        <div className={classes.search}>
            <h3>Найти реквизит</h3>
            <div className={classes.action}>
                <div className={classes.search}>
                    <SearchByName 
                        items={requisitesInitial}
                        setItems={setRequisitesSearch}
                        field={'name'}
                    />
                </div>
            </div>
            <hr />
            <div className={classes.list}>
                <SelectFromList 
                    items={requisitesSearch}
                    field={'name'}
                    onSelected={onSelected}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}