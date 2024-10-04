import { $authHost, $host } from "@/src/shared/api/axios"
import { IProductGroup, IProductGroupItem } from "../model/types"

class ProductGroupService {
    
    controller: AbortController = new AbortController();

    async create(productGroup: IProductGroup){
        const res = await $authHost.post<string>('/admin/productGroup/create', {productGroup})
        return res.data
    }

    async update(productGroup: IProductGroup){
        const res = await $authHost.post<string>('/admin/productGroup/update', {productGroup})
        return res.data
    }

    async delete(productGroupId: number){
        const res = await $authHost.post<string>('/admin/productGroup/delete', {productGroupId})
        return res.data
    }

    async swap(items: IProductGroupItem[]){
        const res = await $authHost.post<string>('/admin/productGroup/swap', {items})
        return res.data
    }

    async fetchGetAll() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const productGroup: IProductGroup[] = await res.json()
        return productGroup
    }

    async fetchNameBySlug(slug: string){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup/name/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            next: {revalidate: 300},
            credentials: 'include',
        })
        const productGroupItem: IProductGroupItem = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return productGroupItem
    }

    async fetchNames(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup/itemNames`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const productGroupItems: IProductGroupItem[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return productGroupItems
    }

    async getItems(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup/itemNames`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            cache: 'no-store',
        })
        const productGroupItems: IProductGroupItem[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return productGroupItems
    }
    
    async get(slug: string){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup/data/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include'
        })
        const productGroup: IProductGroup = await res.json()
        return productGroup
    }

    async getArrayByTitle(title: string){
        if(this.controller){
            this.controller.abort()
        }

        this.controller = new AbortController()
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup/arrayByTitle/${title}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
            signal: this.controller.signal
        })
        const productGroup: IProductGroup[] = await res.json()

        return productGroup
    }

    async getNames(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup/names`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include'
        })
        const names: {value: string, name: string}[] = await res.json()
        return names
    }
}

export const productGroupService = new ProductGroupService()