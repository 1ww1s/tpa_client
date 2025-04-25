import { PageTitle } from '@/src/widgets/pageTitle';
import {requisiteService, RequisitesTable} from '@/src/entities/requisite';
import { Suspense } from 'react';
import { LoaderDiv } from '@/src/shared/components/loaderDiv/LoaderDiv';
import {LatestDevelopments} from '@/src/widgets/latestDevelopments';
import classes from './information.module.scss'
import { InformationDisclosure } from '@/src/widgets/informationDisclosure';


export default async function Information() {


    return (
        <>
            <PageTitle title={'Раскрытие информации'} image='Панель управления' />
            <div className={classes.information}>
                <div className="wrapper">
                    <div className={classes.content}>
                        <div className={classes.requisites}>
                            <Suspense fallback={<div className={classes.loaderDiv}><LoaderDiv height={300} /></div>}>
                                <InformationDisclosure />
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