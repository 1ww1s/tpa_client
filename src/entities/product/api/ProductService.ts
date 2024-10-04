import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct, IProductItem, IProductPreview } from '../model/types'
import { $authHost } from '@/src/shared/api/axios'


class ProductService {

    controller: AbortController = new AbortController();

    async fetchProduct(slug: string): Promise<IProduct> { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/data/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const product: IProduct = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return product
    }

    async fetchImages(slug: string): Promise<IProduct['images']> { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/images/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const images: IProduct['images'] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return images
    }

    async fetchNameBySlug(slug: string){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/name/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const productItem: IProductItem = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return productItem
    }

    async fetchNames(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/itemNames`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            next: {revalidate: 300}
        })
        const productItems: {productGroupSlug: string, productSlug: string}[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return productItems
    }
    
    async fetchPreviews(pathname: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productPreviews/${pathname}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            next: {revalidate: 300},
            credentials: 'include',
        })
        const productsPreview: IProductPreview[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return productsPreview
    }

    async fetchProductsOfGroup(slug: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/itemsByProduct/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            next: {revalidate: 300},
            credentials: 'include',
        })
        const items: IProductItem[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return items
    }

    async getItemsOfGroup(slug: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/itemsByGroup/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
        })
        const items: IProductItem[] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return items
    }


    async get(slug: string): Promise<IProduct> { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/data/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
        })
        const product: IProduct = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return product
    }

    async getImages(slug: string): Promise<IProduct['images']> { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/images/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            next: {revalidate: 300}
        })
        const images: IProduct['images'] = await res.json()
        if(!res.ok) throw new Error(res.statusText)
        return images
    }

    async getPreview(slug: string) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/productPreview/${slug}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include'
        })
        const productPreview: IProductPreview = await res.json()
        return productPreview
    }

    async getArrayByName<T>(name: string){
        if(this.controller){
            this.controller.abort()
        }
        
        this.controller = new AbortController()
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/site/product/arrayByName/${name}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            credentials: 'include',
            signal: this.controller.signal
        })
        const products: T[] = await res.json()
        return products
    }

    async create(product: IProduct) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/product/create`, {product})
        return res.data
    }

    async update(product: IProduct) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/product/update`, {product})
        return res.data
    }

    async delete(productId: number) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/product/delete`, {productId})
        return res.data
    }

    async swap(items: IProductItem[]) {
        const res = await $authHost.post<string>(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/admin/product/swap`, {items})
        return res.data
    }
}

export const productService = new ProductService()