import { ICompanyCard, requisiteService, validationCompanyCard } from "@/src/entities/requisite";
import { AddImgList } from "@/src/features/addImgList";
import { SendDetailedData } from "@/src/features/sendDetailedData";
import { FileList } from "@/src/shared/components/file/fileList/FileList";
import { FC } from "react";

interface IProps {
    companyCard: ICompanyCard;
    setCompanyCard: (companyCard: ICompanyCard) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}

export const ChangingAndSendData: FC<IProps> = (
    {companyCard, setCompanyCard, setIsLoading, isLoading, selectedWidget, setSelectedWidget}
) => {

    const setCompanyCards = (cards: ICompanyCard[]) => {
        setCompanyCard(cards[1])
    } 

    const handleSubmit = async () => {
        const formData = new FormData();
        console.log(companyCard)
        if(companyCard?.file) {
            formData.append('file', companyCard.file)
        }
        return await requisiteService.updateCompanyCard(formData) // заменить update
    };

    return (
        <div>
            <h3>Обновить карточку предприятия</h3>
            <AddImgList images={[companyCard]} setImages={setCompanyCards} accept=".pdf" />
            <FileList files={(companyCard.blobUrl || companyCard.url) ? [companyCard] : []} />
            <hr />
            <SendDetailedData
                action={'update'}
                validation={setError => validationCompanyCard(companyCard, setError)}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                sendData={handleSubmit}
                onEnd={() => setSelectedWidget(selectedWidget + 1)} 
            />
        </div>
    )
}