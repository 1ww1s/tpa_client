import { IWhyUs } from "./types";
import handshake from '../lib/assets/handshake.png'
import teamwork from '../lib/assets/teamwork.png'
import growth from '../lib/assets/growth.png'  
import documentKey from '../lib/assets/documentKey.png'

export const whyUs: IWhyUs[] = [
    {
        title: 'Индивидуальный подход',
        description: 'Мы эффективно удовлетворяем потребности клиентов за счет решения поставленных задач строго в соответствии с согласованным техническим заданием.',
        iconSrc: handshake.src,
    },
    {
        title:'Команда профессионалов',
        description: 'Высокая квалификация сотрудников позволяет нашей компании творчески подходить к разработке судовых и промышленных систем управления и автоматики любой степени сложности.',
        iconSrc: teamwork.src,
    },
    {
        title: '15 лет опыта',
        description: 'Наша компания присутствует на рынке судовых систем управления и автоматики с 2006 года.',
        iconSrc: growth.src,
    },
    {
        title: 'Разработка под ключ',
        description: 'Мы обеспечиваем полный жизненный цикл нашей продукции от идеи, проектирования и разработки до сервисного обслуживания.',
        iconSrc: documentKey.src,
    }
]