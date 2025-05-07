import { GetDataByName } from "@/src/features/getDataByName";
import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useEffect, useMemo, useState } from "react";
import classes from './searchAndSelection.module.scss'
import { certificateService, ICertificate } from "@/src/entities/certificate";
import { SearchByName } from "@/src/features/searchByName";
import { SortByField } from "@/src/features/sortByField";

interface SearchProps {
    setCertificate: (certificate: ICertificate) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}


export const SearchAndSelection: FC<SearchProps> = ({setCertificate, selectedWidget, setSelectedWidget}) => {
   
    const [certificatesInitial, setCertificatesInitial] = useState<ICertificate[]>([])
    const [certificatesSearch, setCertificatesSearch] = useState<ICertificate[]>([])
    const [certificatesSearchAndSort, setCertificatesSearchAndSort] = useState<ICertificate[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const onSelected = async (selected: ICertificate) => {
        setCertificate(selected)
        setSelectedWidget(selectedWidget + 1)
    }

    const getCertificates = async () => {
        try{    
            setIsLoading(true)
            const certificates = await certificateService.getAll()
            console.log(certificates)
            setCertificatesInitial(certificates)
            setCertificatesSearch(certificates)
            setCertificatesSearchAndSort(certificates)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCertificates()
    }, [])

    // const expirationDate = (date: string): boolean => {
    //     const isOk = true;
    //     console.log(Math.floor((new Date(date).getTime() - Date.now()) / 86400000).toLocaleString("ru"))
    //     return isOk;    
    // }

    return (
        <div className={classes.search}>
            <h3>Найти сертификат</h3>
            <div className={classes.action}>
                <div className={classes.search}>
                    <SearchByName 
                        items={certificatesInitial}
                        setItems={setCertificatesSearch}
                        field={'name'}
                    />
                </div>
                <div className={classes.sort}>
                    <SortByField 
                        initialItems={certificatesSearch}
                        setItems={setCertificatesSearchAndSort}
                        field={'endDate'}
                        title="Сортировать по дате"
                    />
                </div>
            </div>
            <hr />
            <div className={classes.list}>
                <SelectFromList 
                    items={certificatesSearchAndSort}
                    field={'name'}
                    onSelected={onSelected}
                    isLoading={isLoading}
                />
                <ul className={classes.endDate}>
                    {certificatesSearchAndSort.map(c => 
                        <li key={c.id}>{new Date(c.endDate).toLocaleDateString("ru")}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}