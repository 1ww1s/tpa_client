import { IProductGroup, IProductGroupItem, productGroupService } from "@/src/entities/productGroup";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

const getData = async () =>  {
    let productGroup: IProductGroupItem[] = [];
    try{
        productGroup = await productGroupService.fetchNames()
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return productGroup
}

export default async function Produces() {

    const productGroup = await getData()

    return (
        <div>
            <h2>Предприятие производит:</h2>
            <ul>
                {productGroup.map(p =>
                    <li key={p.name}>{p.name}</li>
                )}
            </ul>
        </div>
    )
}