"use client"

import { useObserver } from "@/src/shared/lib/hooks/useObserver";
import { FC, PropsWithChildren, useRef } from "react";

interface ObservedProps {
    classesObserved: string;
    classesTarget: string;

}

export const Observed: FC<PropsWithChildren & ObservedProps> = ({classesObserved, classesTarget, children}) => {

    const ref = useRef(null) 
    
    useObserver(ref, (elem: Element) => elem.classList.add(classesObserved), classesTarget)

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}