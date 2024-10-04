import { Login } from "@/src/views/login/Login";
import { Metadata, NextPage } from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Вход',
};
  

const LoginPage: NextPage = () => {


    return (
        <div>
            <Login />
        </div>
    )
}

export default LoginPage;