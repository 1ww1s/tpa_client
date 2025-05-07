import { PageTitle } from "@/src/widgets/pageTitle";
import { Suspense } from "react";
import classes from './about.module.scss'
import AboutCompany from "@/src/widgets/aboutCompany";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";
import {LatestDevelopments} from "@/src/widgets/latestDevelopments";

export default async function About() {

    return (
        <>
        <PageTitle title='О КОМПАНИИ АО "ПФК ТВЕРЬПРОМАВТОМАТИКА"' image='Панель управления' />
        <div className={classes.about}>
            <div className="wrapper">
                <div className={classes.content}>
                    <div className={classes.aboutText}>
                        <AboutCompany />
                    </div>
                    <div className={classes.rightBar}>
                        <Suspense fallback={<LoaderDiv height={466} />}>
                            <div className={classes.latestDevelopments}>
                                <LatestDevelopments />
                            </div>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}