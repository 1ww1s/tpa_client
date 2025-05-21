import { FC } from "react";
import classes from './productGroupBoxes.module.scss'
import { IProductGroup, ProductGroupCard } from "@/src/entities/productGroup";
import { ClickOnButton } from "@/src/features/clickOnButton";
import { Observed } from "@/src/features/observed";

interface ProductGroupBoxesProps {
    productGroup: IProductGroup[];
}

export const ProductGroupBoxes: FC<ProductGroupBoxesProps> = ({productGroup}) => {
    return (
        <div className={classes.productGroupBoxes}>
            {productGroup.map(p => 
                <div className={classes.productGroupBox} key={p.title}>
                    <Observed classesObserved={classes.observed} classesTarget={classes.productGroupBox}>
                        <ProductGroupCard productGroup={p}>
                            <ClickOnButton title="Подробнее..." link={process.env.NEXT_PUBLIC_CLIENT_URL + `/product-catalog/${p.slug}`} />
                        </ProductGroupCard>
                    </Observed>
                </div>
            )}
        </div>
    )
}