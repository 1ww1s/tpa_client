import {FC, useRef } from 'react'
import { OpenDiv } from '../openDiv/OpenDiv'
import classes from './productModifications.module.scss'
import { IModification, IProduct } from '@/src/entities/product'
import { MyInput } from '@/src/shared/components/myInput/MyInput';
import { MyButton } from '@/src/shared/components/myButtonAdmin/MyButtonAdmin';
import remove from '@/src/shared/lib/assets/x-close.png'
import plus from '@/src/shared/lib/assets/plus.png'
import plusSquare from '@/src/shared/lib/assets/plus-square.png'

interface ProductModificationsProps {
    modifications: IProduct['modifications'];
    setModifications: (modifications: IProduct['modifications']) => void
}

export const ProductModifications: FC<ProductModificationsProps> = ({modifications, setModifications}) => {
    
const refTechCharacteristics = useRef<HTMLDivElement>(null)

    const removeItem = (i: number) => {
        return function(){
            let newTC: IProduct['modifications'] = JSON.parse(JSON.stringify(modifications));;
            newTC.items.splice(i, 1)
            newTC.data.forEach(d => {
                d.value.splice(i, 1)
            })
            setModifications(newTC)
        }
    }

    const setItem = (newVal: string, i: number) => {
        const newTCItems: IProduct['modifications']['items'] = JSON.parse(JSON.stringify(modifications.items));
        newTCItems[i].name = newVal;
        setModifications({ items: newTCItems, data: modifications.data })
    }

    const addItem = () => {
        const newTCItems: IProduct['modifications']['items'] = [...modifications.items];
        const newTCData: IProduct['modifications']['data'] = JSON.parse(JSON.stringify(modifications.data));
        newTCData.forEach((d) => {
            d.value.push({id: -1, value: ''})
        })
        newTCItems.push({id: -1, name: ''})
        setModifications({ items: newTCItems, data: newTCData })
    }

    const setData = (newVal: string, field: Exclude<keyof IModification, "id">, indRow: number, indCol = 0) => {
        const newTCData: IProduct['modifications']['data'] = JSON.parse(JSON.stringify(modifications.data));
        if(field === 'value'){
            newTCData[indRow].value[indCol].value = newVal;
        }
        else{
            newTCData[indRow][field] = newVal;
        }
        setModifications({ items: modifications.items, data: newTCData})
    }

    const addTC = () => {
        const newTCData: IProduct['modifications']['data'] = [...modifications.data];
        let newValues = modifications.items.map((): IModification['value'][0] => { return {id: -1, value: ''}})
        newTCData.push({id: -1, name: '', value: newValues})
        setModifications({items: modifications.items, data: newTCData})
    }

    const setTC = (ind: number) => {
        const newTCData: IProduct['modifications']['data'] = [...modifications.data];
        let newValues = modifications.items.map((): IModification['value'][0] => { return {id: -1, value: ''}})
        newTCData.splice(ind + 1, 0, {id: -1, name: '', value: newValues})
        setModifications({items: modifications.items, data: newTCData})
    }

    const removeTC = (i: number) => {
        const newTCData: IProduct['modifications']['data'] = [...modifications.data];
        newTCData.splice(i, 1)
        setModifications({items: modifications.items, data: newTCData})
    }

    return (
        <div>
            <OpenDiv title="Модификации" toggleClasses={classes} refToggle={refTechCharacteristics} />
            <div ref={refTechCharacteristics} className={classes.techCharacteristicsDiv}>
                <div className={classes.products}>
                    <div className={classes.addItem}>
                    { 
                        modifications.items.map((t, i) => 
                            <div key={i} className={classes.item}>
                                <MyInput 
                                    onInput={(e) => e.currentTarget.focus()} 
                                    value={t.name} 
                                    setValue={(val: string) => {setItem(val, i)}}
                                    placeholder="название..."
                                />
                                <img src={remove.src} onClick={removeItem(i)} />
                            </div>    
                        )
                    }
                    <img onClick={addItem} src={plusSquare.src} />
                    </div>
                    <div className={classes.characteristics}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Обозначение</th>
                                    {
                                        modifications.items.map((i, ind) => 
                                            <th key={ind}>{i.name}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                            {
                                modifications.data.map((d, ind) => 
                                    <tr key={ind}>  
                                        <td><MyInput value={d.name} setValue={val => setData(val, "name", ind)} /></td>
                                        {
                                            modifications.items.map((_, indCol) => 
                                                <td key={indCol}><MyInput value={d.value[indCol]?.value} setValue={val => setData(val, "value", ind, indCol)} /></td>
                                            )
                                        }
                                        <td className={classes.setTC}><img src={plus.src} onClick={() => setTC(ind)} /></td>
                                        <td className={classes.removeTC}><img src={remove.src} onClick={() => removeTC(ind)} /></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <div className={classes.addTC}>
                            <MyButton onClick={addTC}>Добавить</MyButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}