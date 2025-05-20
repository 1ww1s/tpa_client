import { FC, Suspense } from "react";
import classes from './latestDevelopments.module.scss'
import { TitleWithSeparator } from "@/src/shared/components/titleWithSeparator/components/TitleWithSeparator";
import { Boxes } from "../boxes/Boxes";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";

export const LatestDevelopmentsHome: FC = async () => {

    return (
        <div className={classes.latestDevelopments}>
            <div className="wrapper">
                <TitleWithSeparator title="НАШИ НОВЫЕ РАЗРАБОТКИ" />
                <div className={classes.boxes}>
                    <Suspense 
                        fallback={
                            <div className={classes.loaderDiv}>
                                <LoaderDiv />
                            </div>
                        }
                    >
                        <Boxes />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}