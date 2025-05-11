import { FC } from "react";
import classes from './whyChooseUs.module.scss'
import { TitleWithSeparator } from "@/src/shared/components/titleWithSeparator/components/TitleWithSeparator";
import { Details } from "../details/Details";
import { whyUs } from "../../model/initialState";
import { WhyUsCard } from "../whyUsCard/WhyUsCard";


export const WhyChooseUs: FC = () => {
    return (
        <div className={classes.whyChooseUs}>
            <div className="wrapper">
                <TitleWithSeparator title="ПОЧЕМУ ВЫБИРАЮТ НАС" />
                <div className={classes.content}> 
                    <div className={classes.details}>
                        <Details />
                    </div>
                    <div className={classes.whyUs}>
                        {whyUs.map((w, ind) => 
                            <WhyUsCard 
                                key={ind}
                                ind={ind + 1}
                                title={w.title}
                                description={w.description}
                                iconSrc={w.iconSrc}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}