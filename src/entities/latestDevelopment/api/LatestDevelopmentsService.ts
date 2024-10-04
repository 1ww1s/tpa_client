import { $authHost } from "@/src/shared/api/axios"
import { ILatestDevelopment } from "../model/types"
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
        const latestDevelopments: IProductItem[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return latestDevelopments
    }

    async create(productId: number) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/latestDevelopments/create`, {productId})
        return res.data
    }

    async delete(productId: number) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/latestDevelopments/delete`, {productId})
        return res.data
    }
}

export const latestDevelopmentsService = new LatestDevelopmentsService()