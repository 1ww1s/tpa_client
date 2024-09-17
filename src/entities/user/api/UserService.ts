import { $authHost, $host } from "@/src/shared/api/axios"
import { IUser } from "../model/types"

type TResponse = {
    user: IUser;
    accessToken: string;
}

class UserService{

    async addRole(email: string, role: string){
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/user/role/add`, {email, role})
        return res.data
    }

    async deleteRole(email: string, role: string){
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/user/role/delete`, {email, role})
        return res.data
    }

    async registration(email: string, password: string) {
        const res = await $host.post<TResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/user/registration`, {email, password})
        localStorage.setItem('token', res.data.accessToken)
        return res.data
    }

    async login(email: string, password: string) {
        const res = await $host.post<TResponse>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/user/login`, {email, password})
        localStorage.setItem('token', res.data.accessToken)
        return res.data
    }

    async logout() {
        const res = await $authHost.get<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/user/logout`)
        localStorage.removeItem('token')
        return res.data
    }

    async check(){
        const res = await $authHost.get<IUser>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/user/check`)
        return res.data
    }

    async getAll(){
        const res = await $authHost.get<IUser[]>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/user`)
        return res.data
    }

}


export const userService = new UserService()