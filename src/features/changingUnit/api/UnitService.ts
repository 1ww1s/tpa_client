// import Request from "@/src/shared/api/Request";


import { $authHost, $host } from "@/src/shared/api/axios"


class UnitService {
    async send(value: string){
        const res = await $authHost.post<string>('/admin/unit/create', {value})
        return res.data
    }
}

export const unitService = new UnitService()