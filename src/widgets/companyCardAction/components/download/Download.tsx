import { ICompanyCard, requisiteService } from "@/src/entities/requisite";
import { LoaderSpinner } from "@/src/shared/components/loaderSpinner/LoaderSpinner";
import { FC, useEffect } from "react";
import classes from './download.module.scss'

interface IProps {
    setIsLoading: (isLoading: boolean) => void;
    setCompanyCard: (companyCard: ICompanyCard) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}

export const Download: FC<IProps> = ({setCompanyCard, setIsLoading, selectedWidget, setSelectedWidget}) => {

    const getData = async () => {
        try{
            setIsLoading(true)
            const companyCard: ICompanyCard = await requisiteService.getCompanyCard()
            setCompanyCard(companyCard)
            setSelectedWidget(selectedWidget + 1)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={classes.download}>
            <LoaderSpinner />
        </div>
    )
}