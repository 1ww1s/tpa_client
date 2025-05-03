
type TContact = 'Телефон' | 'E-mail' | 'Часы работы' | 'Адрес' | '';

export interface IContact {
    title: TContact;
    description: string;
}