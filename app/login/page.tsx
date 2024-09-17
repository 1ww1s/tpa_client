import { Auth } from "@/src/widgets/auth";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Вход',
};
  

const LoginPage: NextPage = () => {


    return (
        <div>
            <Auth />
        </div>
    )
}

export default LoginPage;