
import { userService } from "@/src/entities/user";
import Admin from "@/src/views/admin/Admin";
import { AdminPreload } from "@/src/views/admin/AdminPreload";
import { LoadingScreen } from "@/src/shared/components/loadingScreen/LoadingScreen";
import { Metadata, NextPage } from "next";
import React, { useState } from "react";


export const metadata: Metadata = {
    title: "Admin panel",
    robots: "noindex, nofollow"
}


const AdminPage: NextPage = () => {
    
   
    
    return ( 
        <div>
            <AdminPreload />
        </div>
    )
}

export default AdminPage