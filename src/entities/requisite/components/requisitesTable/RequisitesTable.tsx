import { MyTable } from "@/src/shared/components/myTable/MyTable";
import { IRequisite } from "../../model/types";
import classes from './requisitesTable.module.scss'
import { requisiteService } from "../../api/RequisiteService";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { Empty } from "@/src/shared/components/empty/Empty";

const columns: string[] = ['Наименование', 'Значение']

const getData = async () => {
    let requisites: IRequisite[] = [];
    try{
        requisites = await requisiteService.fetchGetAll()
    }
    catch(error){
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.log(error)
    }
    return requisites;
}

export default async function RequisitesTable() {

    const requisites = await getData()
    
    if(!requisites.length) return <Empty />

    const rows: (string)[][] = [];

    const getRows = () => {
        requisites.map(requisite => rows.push([requisite.name, requisite.value]))
    }
    getRows()

    return (
        <div className={classes.requisitesTable}>
            <div className={classes.table}>
                <MyTable rows={rows} columns={columns} />
            </div>
        </div>
    )
}