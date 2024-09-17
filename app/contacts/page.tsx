import { Contacts } from "@/src/views/contacts/Contacts";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Контакты",
}

const ContactsPage: NextPage = () => {


    return (
        <div>
            <Contacts />
        </div>
    )
}

export default ContactsPage;