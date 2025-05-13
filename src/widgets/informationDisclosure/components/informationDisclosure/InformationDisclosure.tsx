
import classes from './informationDisclosure.module.scss'
import { IInformationDisclosure, informationDisclosureService } from "@/src/entities/informationDisclosure";
import { Disclosure } from "@/src/features/disclosure";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { Empty } from "@/src/shared/components/empty/Empty";

const getData = async () => {
    let informationDisclosures: IInformationDisclosure[] = [];
    try{
        informationDisclosures = await informationDisclosureService.getAll()
    }
    catch(error){
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error)
    }
    return informationDisclosures;
}

export default async function InformationDisclosure() {

    const informationDisclosures = await getData()

    if(!informationDisclosures.length) return <Empty />

    return (
        <ul className={classes.informationDisclosures}>
        {
            informationDisclosures.map((informationDisclosure, ind) => 
                <li className={classes.item} key={ind}>
                    <Disclosure informationDisclosure={informationDisclosure} />
                </li>
            )
        }
        </ul>
    )
}