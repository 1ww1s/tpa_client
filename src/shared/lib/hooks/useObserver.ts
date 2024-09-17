import { useRef, useEffect, Ref, MutableRefObject } from "react"

export const useObserver = function(contentRef: MutableRefObject<null>, callback: (elem: Element) => void, nameClassTargetElem: string){

    let options = {
        rootMargin: '-50px'
    }

    const observer = useRef<IntersectionObserver | null>(null)
     
    useEffect(() => { 
        const targets = document.querySelectorAll<Element>(`.${nameClassTargetElem}`)
        
        if(targets.length === 0) return
        if(observer.current) observer.current.disconnect()
        const cb = function(entries: IntersectionObserverEntry[], observer: IntersectionObserver){
            entries.map(entry => {
                if(entry.isIntersecting){
                    callback(entry.target)
                    observer.unobserve(entry.target);
                }
            })
        };
        observer.current = new IntersectionObserver(cb, options)
        

        for(let ind = 0; ind < targets.length; ind++){
            observer.current.observe(targets[ind])
        }
    }, [contentRef])
}
