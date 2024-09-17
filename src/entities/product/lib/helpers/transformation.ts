import { Marked } from "@ts-stack/markdown"


export const transformation = (value: string): {__html: string} => {
    return {__html: Marked.parse(value)}
}