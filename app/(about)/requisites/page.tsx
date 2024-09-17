import { IRequisite, requisiteService } from "@/src/entities/requisite";
import Requisites from "@/src/views/requisites/Requisites";
import { Metadata, NextPage } from "next";
import React from "react";


export const metadata: Metadata = {
    title: "Реквизиты",
}

export default async function RequisitesPage() {


    return ( 
        <div>
            <Requisites />
        </div>
    )
}
