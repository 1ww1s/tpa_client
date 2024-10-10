import { FC } from "react";
import classes from './groupModels.module.scss'
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import hrImg from '@/src/shared/lib/assets/hr.png'
import { IProductItem, IProductPreview, productService } from "@/src/entities/product";
import { ClickOnLink } from "@/src/features/clickOnLink";
import Link from "next/link";


const getData = async (slug: string) =>  {
    let groupModels: IProductItem[] = [];
    try{
        groupModels = await productService.fetchProductsOfGroup(slug)
    }
    catch(e){
        if (isDynamicServerError(e)) {
            throw e;
        }
        console.log(e)
    }
    return groupModels
}

interface GroupModelsProps {
    slug: string;
}

export const GroupModels: FC<GroupModelsProps> = async ({slug}) => {
    
    const groupModels = await getData(slug)

    return (
        <div className={classes.groupModels}>
            <h2>МОДЕЛИ ЭТОЙ ГРУППЫ</h2>
            <img className={classes.hrImg} src={hrImg.src} />
            {groupModels.map(gm => 
            <div className={classes.groupModel}>
                    <Link href={gm.slug}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{gm.name}</span>
                    </Link>
            </div>
            )}
        </div>
    )
}