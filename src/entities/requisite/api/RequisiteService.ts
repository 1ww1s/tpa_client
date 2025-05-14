import { $authHost } from "@/src/shared/api/axios"
import { ICompanyCard, IRequisite } from "../model/types"


class RequisiteService{

    async create(requisite: IRequisite){
        const res = await $authHost.post<string>(process.env.NEXT_PUBLIC_SERVER_URL_API + '/admin/requisite/create', {requisite})
        return res.data
    }

    async update(requisite: IRequisite){
        const res = await $authHost.post<string>(process.env.NEXT_PUBLIC_SERVER_URL_API + '/admin/requisite/update', {requisite})
        return res.data
    }

    async updateCompanyCard(formData: FormData){
        const res = await $authHost.post<string>(process.env.NEXT_PUBLIC_SERVER_URL_API + '/admin/companyCard/update', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }

    async delete(requisiteId: number){
        const res = await $authHost.post<string>(process.env.NEXT_PUBLIC_SERVER_URL_API + '/admin/requisite/delete', {requisiteId})
        return res.data
    }

    async fetchGetAll() {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL_API + '/site/requisite', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const requisite: IRequisite[] = await res.json()
        return requisite
    }

    async getAll() {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL_API + '/site/requisite', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include'
        })
        const requisite: IRequisite[] = await res.json()
        return requisite
    }

    async fetchCompanyCard() {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL_API + '/site/companyCard', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const companyCard: ICompanyCard = await res.json()
        return companyCard
    }
    
    async getCompanyCard() {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL_API + '/site/companyCard', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include'
        })
        const companyCard: ICompanyCard = await res.json()
        return companyCard
    }
}

export const requisiteService = new RequisiteService()