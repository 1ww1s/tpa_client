import classes from './requisites.module.scss'
import { PageTitle } from '@/src/widgets/pageTitle';
import {CompanyCard, requisiteService, RequisitesTable} from '@/src/entities/requisite';
import { Suspense } from 'react';
import { LoaderDiv } from '@/src/shared/components/loaderDiv/LoaderDiv';
import {LatestDevelopments} from '@/src/widgets/latestDevelopments';


export default async function Requisites() {


    return (
        <>
            <PageTitle title={'Реквизиты'} image='Панель управления' />
            <div className={classes.requisite}>
                <div className="wrapper">
                    <div className={classes.content}>
                        <div className={classes.requisites}>
                            <Suspense fallback={<div className={classes.loaderDiv}><LoaderDiv height={600} /></div>}>
                                <RequisitesTable />
                                <CompanyCard />
                            </Suspense>
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