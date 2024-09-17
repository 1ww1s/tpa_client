import { FC, Suspense } from "react";
import classes from './aboutCompany.module.scss'
import Produces from "../produces/Produces";
import Partners from "../partners/Partners";
import { LoaderDiv } from "@/src/shared/components/loaderDiv/LoaderDiv";



export const AboutCompany: FC = async () => {


    return (
        <div className={classes.aboutCompany}>
            <h1>О компании</h1>
            <p>
                АО “ПФК Тверьпромавтоматика” занимается разработкой и производством систем управления и автоматики судовых 
                и стационарных дизель-генераторов, систем управления судовыми главными двигателями, систем ДАУ главными двигателями,
                щитов автоматики и различного электронного оборудования.
            </p>
            <Suspense fallback={<LoaderDiv height={200} />}>
                <Produces />
            </Suspense>
            <p>
                Опыт и квалификация персонала, современное оборудование, творческий подход и использование новых технологий в 
                разработке и производстве позволяют создавать оборудование, отвечающее требованиям высокой надежности, 
                эргономичности и простоты эксплуатации.
            </p>
            <Suspense fallback={<LoaderDiv height={100} />}>
                <Partners />
            </Suspense>
            <p>
                На нашем сайте Вы найдете информацию о производимой нами продукции и оказываемых услугах. 
                Наши специалисты окажут техническую консультацию и помощь в решении Ваших задач.
            </p>
        </div>
    )
}