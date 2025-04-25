import { ABOUT_ROUTE, CERTIFICATES_ROUTE, CONTACTS_ROUTE, HOME_ROUTE, INFORMATION_ROUTE, PRODUCTS_ROUTE, REQUISITES_ROUTE } from "./links"


export interface TSection {
    sections: {
        link: string, name: string, children?: TSection
    }[]
}


export const sections: TSection = {
    sections: [
        {
            name: 'ГЛАВНАЯ',
            link: HOME_ROUTE
        },
        {
            name: 'ПРОДУКЦИЯ',
            link: PRODUCTS_ROUTE
        },
        {
            name: 'О КОМПАНИИ',
            link: ABOUT_ROUTE,
            children: {
                sections: [
                    {
                        name: 'О нас',
                        link: ABOUT_ROUTE,
                    },
                    {
                        name: 'Сертификаты',
                        link: CERTIFICATES_ROUTE
                    },
                    {
                        name: 'Реквизиты',
                        link: REQUISITES_ROUTE
                    },
                    {
                        name: 'Раскрытие информации',
                        link: INFORMATION_ROUTE
                    }
                ]
            }
        },
        {
            name: 'КОНТАКТЫ',
            link: CONTACTS_ROUTE
        }
    ]
}
    