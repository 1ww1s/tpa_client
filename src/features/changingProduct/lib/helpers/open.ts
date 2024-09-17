import { RefObject } from "react"

export function open<T extends {readonly [key: string]: string}>(
    refToggle: RefObject<HTMLDivElement>, 
    toggleClasses: T,
    refOpen: RefObject<HTMLDivElement>,
    openClasses: T    
) {
    refOpen.current?.classList.toggle(openClasses.open)
    refToggle.current?.classList.toggle(toggleClasses.open)
}