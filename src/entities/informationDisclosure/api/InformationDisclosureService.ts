


import { $authHost, $host } from "@/src/shared/api/axios"
import { IInformationDisclosure } from "../model/types";

class InformationDisclosureService {
    
    controller: AbortController = new AbortController();

    async create(informationDisclosure: IInformationDisclosure){
        const res = await $authHost.post<string>('/admin/informationDisclosure/create', {informationDisclosure})
        return res.data
    }

    async update(informationDisclosure: IInformationDisclosure){
        const res = await $authHost.post<string>('/admin/informationDisclosure/update', {informationDisclosure})
        return res.data
    }

    async delete(id: number){
        const res = await $authHost.post<string>('/admin/informationDisclosure/delete', {id})
        return res.data
    }

    async getAll(){
        const res = await $host.get<IInformationDisclosure[]>('/site/informationDisclosure/getAll')
        return res.data
    }

    // async fetchGetAll() {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productGroup`, {
    //         method: "GET",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include',
    //         next: {revalidate: 300}
    //     })
    //     const productGroup: IProductGroup[] = await res.json()
    //     return productGroup
    // }

    async getByName(name: string){
        const res = await $host.post<IInformationDisclosure>('/site/informationDisclosure/name', {name})
        return res.data
    }

    async getArrayByName(name: string){
        if(this.controller){
            this.controller.abort()
        }
        
        this.controller = new AbortController()
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/informationDisclosure/arrayByName`, {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
            signal: this.controller.signal
        })
        const items: {name: string}[] = await res.json()
        return items
    }
}

export const informationDisclosureService = new InformationDisclosureService()