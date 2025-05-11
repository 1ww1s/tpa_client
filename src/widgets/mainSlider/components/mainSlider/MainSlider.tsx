import { FC } from "react";
import { MainSliderCard } from "../mainSliderCard/MainSliderCard";
import { ClickOnButton } from "@/src/features/clickOnButton";


export const MainSlider: FC = () => {
    return (
        <MainSliderCard action={ <ClickOnButton title="К продукции" link="/product-catalog" />} />
    )
}