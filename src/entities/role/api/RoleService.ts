import { $authHost, $host } from "@/src/shared/api/axios"
import { IRole } from "../model/types"



class RoleService{

    async add(email: string, role: string){
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/user/role/add`, {email, role})
        return res.data
    }

    async delete(email: string, role: string){
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/user/role/delete`, {email, role})
        return res.data
    }

    async getAll(){
        const res = await $authHost.get<IRole[]>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/user/role`)
        return res.data
    }
}


export const roleService = new RoleService()