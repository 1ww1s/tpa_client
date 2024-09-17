
type TContact = 'Телефон' | 'E-mail' | 'Часы работы' | 'Адресс' | '';

export interface IContact {
    title: TContact;
    description: string;
}