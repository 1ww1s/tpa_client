import Certificates from "@/src/views/certificates/Certificates";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
    title: "Сертификаты",
}

export default async function CertificatesPage() {
    return ( 
        <Certificates />
    )
}
