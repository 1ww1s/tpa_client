import {FC, useRef} from 'react'
import { OpenDiv } from '../openDiv/OpenDiv'
import classes from './productModifications.module.scss'
import { IModification, IProduct } from '@/src/entities/product'
import { MyTableAdmin } from '@/src/shared/components/myTableAdmin/MyTableAdmin';
import { MyInput } from '@/src/shared/components/myInput/MyInput';
import { MyButton } from '@/src/shared/components/myButtonAdmin/MyButtonAdmin';
import remove from '@/src/shared/lib/assets/x-close.png'
import { SetData, AddRow, RemoveRow } from '../../lib/helpers/tableOperation';


interface ProductModificationsProps {
    modifications: IProduct['modifications'];
    setModifications: (modifications: IProduct['modifications']) => void
}

export const ProductModifications: FC<ProductModificationsProps> = ({modifications, setModifications}) => {
    
    const refModifications = useRef<HTMLDivElement>(null)

    const setData = SetData(modifications, setModifications) 
    const addRow = AddRow(modifications, {id: -1, name: '', diesel: '', note: ''}, setModifications)
    const removeRow = RemoveRow(modifications, setModifications)
    
    return (
        <div>
            <OpenDiv title='Модификации' refToggle={refModifications} toggleClasses={classes} />
            <div ref={refModifications} className={classes.modificationsDiv}>
                
                <MyTableAdmin 
                    columns={['Обозначение', 'Дизель', 'Примечание']} 
                    tbody =
                    {
                        modifications.map((m, ind) => 
                            <tr key={ind}>
                                <td><MyInput value={m.name} setValue={val => setData(val, 'name', ind)}></MyInput></td>
                                <td><MyInput value={m.diesel} setValue={val => setData(val, 'diesel', ind)}></MyInput></td>
                                <td><MyInput value={m.note} setValue={val => setData(val, 'note', ind)}></MyInput></td>
                                <td className={classes.removeTC}><img src={remove.src} onClick={() => removeRow(ind)} /></td>
                            </tr>
                        )
                    }
                />

                <div className={classes.addTC}>
                    <MyButton onClick={addRow}>Добавить</MyButton>
                </div>
            </div>
        </div>
    )
}