import { $authHost } from "@/src/shared/api/axios"
import { ILatestDevelopment, ILatestItem } from "../model/types"
import { IProduct, IProductItem, IProductPreview } from "../../product"

class LatestDevelopmentsService {
    async fetchGet(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/latestDevelopments`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            next: {revalidate: 300},
            credentials: 'include',
        })
        const latestDevelopments: ILatestDevelopment[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return latestDevelopments
    }

    async getItems(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/latestDevelopments/items`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
        })
        const latestDevelopments: ILatestItem[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return latestDevelopments
    }

    async get(item: ILatestItem){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/latestDevelopment`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item}),
            cache: 'no-store',
            credentials: 'include',
        })
        const latestDevelopments: ILatestDevelopment = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return latestDevelopments
    }

    async create(formData: FormData) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/latestDevelopments/create`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }

    async delete(id: number) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/latestDevelopments/delete`, {id})
        return res.data
    }
}

export const latestDevelopmentsService = new LatestDevelopmentsService()