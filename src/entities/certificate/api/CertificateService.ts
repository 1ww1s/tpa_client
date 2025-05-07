import { $authHost } from '@/src/shared/api/axios'
import { ICertificate } from '../model/types';


class CertificateService {

    controller: AbortController = new AbortController();

    async fetchGetAll(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/certificates`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const certificates: ICertificate[] = await res.json()
        return certificates
    }

    async getAll(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/certificates`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
        })
        const certificates: ICertificate[] = await res.json()
        return certificates
    }

    async create(formData: FormData) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/certificate/create`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }

    async update(formData: FormData) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/certificate/update`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }

    async delete(certificateId: number) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/certificate/delete`, {certificateId})
        return res.data
    }
}

export const certificateService = new CertificateService()