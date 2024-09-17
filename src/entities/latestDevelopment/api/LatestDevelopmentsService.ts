import { ILatestDevelopment } from "../model/types"

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
}

export const latestDevelopmentsService = new LatestDevelopmentsService()