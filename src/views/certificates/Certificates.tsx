import React, { Suspense } from "react";
import classes from './certificates.module.scss'
import { PageTitle } from "@/src/widgets/pageTitle";
import CertificateList from "@/src/widgets/certificateList";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";

export default async function Certificates() {

    return (
        <>
            <PageTitle title="Сертификаты" image='Сертификаты' />
            <div className={classes.certificates}>
                <div className="wrapper">
                    <div className={classes.content}>
                        <Suspense fallback={<LoaderDiv height={460} />}>
                            <CertificateList />
                        </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}