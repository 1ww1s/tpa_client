import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISelectUnit, IUnit } from '../model/types'
import { $authHost } from '@/src/shared/api/axios'


class UnitService {
    controller: AbortController = new AbortController();

    async getAll(): Promise<IUnit[]> { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/unit`, {
            method: "GET",
            cache: 'no-store',
            credentials: 'include',
        })
        const unit: IUnit[] = await res.json()
        return unit
    }

    async getArrayByValue(value: string){
        if(this.controller){
            this.controller.abort()
        }
        
        this.controller = new AbortController()
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/unit/${value}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
            signal: this.controller.signal
        })
        const units: IUnit[] = await res.json()
        return units
    }

    async get(value: string): Promise<IUnit> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/unit/${value}`, {
            method: "GET",
            cache: 'no-store',
            credentials: 'include'
        })
        const unit: IUnit = await res.json()
        return unit
    }

    async create(value: string) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/unit/create`, {value})
        return res.data
    }

    async update(unit: IUnit) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/unit/update`, {unit})
        return res.data
    }
}

export const unitService = new UnitService()