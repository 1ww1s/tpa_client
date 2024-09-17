import { $authHost } from '@/src/shared/api/axios'
import { IPartner, IPartnerItem } from '../model/types';


class PartnerService {

    controller: AbortController = new AbortController();

    async fetchGetAll(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/partners`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const partners: IPartner[] = await res.json()
        return partners
    }

    async fetchNames(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/partners/names`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const partners: IPartnerItem[] = await res.json()
        return partners
    }


    async getAll(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/partners`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
        })
        const partners: IPartner[] = await res.json()
        return partners
    }

    async create(partner: IPartner) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/partner/create`, {partner})
        return res.data
    }

    async update(partner: IPartner) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/partner/update`, {partner})
        return res.data
    }

    async delete(partnerId: number) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/partner/delete`, {partnerId})
        return res.data
    }
}

export const partnerService = new PartnerService()