import { ReactNode } from "react"

type T = 'create' | 'update' | 'delete'

export const chooseWidgets = (action: T, SearchAndSelection: ReactNode, ChangingProductAndSendData: ReactNode, PreviewAndSendData: ReactNode): ReactNode[] => {
    let mas: ReactNode[] = []
    if(action === 'create'){
        mas = [ChangingProductAndSendData]
    }
    else if(action === 'update'){
        mas = [SearchAndSelection, ChangingProductAndSendData]
    }
    else{
        mas = [SearchAndSelection, PreviewAndSendData]
    }

    return mas
}   