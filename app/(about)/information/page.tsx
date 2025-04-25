import Information from "@/src/views/information/Information";
import { Metadata, NextPage } from "next";
import React from "react";


export const metadata: Metadata = {
    title: "Раскрытие информации",
}

export default async function InformationPage() {


    return ( 
        <Information />
    )
}
