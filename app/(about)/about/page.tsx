import About from "@/src/views/about/About";
import Admin from "@/src/views/admin/Admin";
import { Metadata, NextPage } from "next";
import React from "react";


export const metadata: Metadata = {
    title: "О нас",
}

const AboutPage: NextPage = () => {
    return ( 
        <div>
            <About />
        </div>
    )
}

export default AboutPage