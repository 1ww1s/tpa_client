import { TSection } from "../../model/types"

export const getSections = () => {
    let sections: {link: string, name: string}[] = [];
    return function f(nav: TSection) {
        nav.sections.map(s => {
            if(s.children){
                return f(s.children)
            }
            sections.push({link: s.link, name: s.name})
        })
        return sections;
    }
}