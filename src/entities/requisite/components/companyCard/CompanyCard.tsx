import { ICompanyCard } from "../../model/types";
import { requisiteService } from "../../api/RequisiteService";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { FileOpen } from "@/src/shared/components/file/fileOpen/FileOpen";

const getData = async () => {
    let companyCard: ICompanyCard = {name: ''};
    try{
        companyCard = await requisiteService.fetchCompanyCard()
    }
    catch(error){
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error)
    }
    return companyCard;
}

export default async function CompanyCard() {

    const companyCard = await getData()

    return (
        companyCard.url
            &&
        <FileOpen file={{name: 'карточку предприятия', url: `${process.env.NEXT_PUBLIC_SERVER_URL_API}${companyCard.url}`}} />
    )
}