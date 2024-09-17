import { FC, useEffect, useRef, useState } from "react";
import { OpenDiv } from "../openDiv/OpenDiv";
import classes from './productTechCharacteristics.module.scss'
import { IProduct, ITechCharacteristic } from "@/src/entities/product";
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import plus from '@/src/shared/lib/assets/plus-square.png'
import remove from '@/src/shared/lib/assets/x-close.png'
import { MyButton } from "@/src/shared/components/myButtonAdmin/MyButtonAdmin";
import { ISelectUnit, IUnit } from "@/src/entities/unit/model/types";
import { unitService } from "@/src/entities/unit";
import { MySelect } from "@/src/shared/components/mySelect/MySelect";

interface ProductTechCharacteristicsProps {
    techCharacteristics: IProduct['techCharacteristics'];
    setTechCharacteristics: (techCharacteristics: IProduct['techCharacteristics']) => void
}

export const ProductTechCharacteristics: FC<ProductTechCharacteristicsProps> = ({techCharacteristics, setTechCharacteristics}) => {

    const refTechCharacteristics = useRef<HTMLDivElement>(null)
    const [unit, setUnit] = useState<IUnit[]>([])

    async function getUnit(){
        const unit = await unitService.getAll();
        setUnit(unit)
    } 

    useEffect(() => {
        getUnit()
    }, [])
    
    const removeItem = (i: number) => {
        return function(){
            let newTC: IProduct['techCharacteristics'] = JSON.parse(JSON.stringify(techCharacteristics));;
            newTC.items.splice(i, 1)
            newTC.data.forEach(d => {
                d.value.splice(i, 1)
            })
            setTechCharacteristics(newTC)
        }
    }

    const setItem = (newVal: string, i: number) => {
        const newTCItems: IProduct['techCharacteristics']['items'] = JSON.parse(JSON.stringify(techCharacteristics.items));
        newTCItems[i].name = newVal;
        setTechCharacteristics({ items: newTCItems, data: techCharacteristics.data })
    }

    const addItem = () => {
        const newTCItems: IProduct['techCharacteristics']['items'] = [...techCharacteristics.items];
        const newTCData: IProduct['techCharacteristics']['data'] = JSON.parse(JSON.stringify(techCharacteristics.data));
        newTCData.forEach((d) => {
            d.value.push({id: -1, value: ''})
        })
        newTCItems.push({id: -1, name: ''})
        setTechCharacteristics({ items: newTCItems, data: newTCData })
    }


    const setData = (newVal: string, field: Exclude<keyof ITechCharacteristic, "id">, indRow: number, indCol = 0) => {
        const newTCData: IProduct['techCharacteristics']['data'] = JSON.parse(JSON.stringify(techCharacteristics.data));
        if(field === 'value'){
            newTCData[indRow].value[indCol].value = newVal;
        }
        else{
            newTCData[indRow][field] = newVal;
        }
        setTechCharacteristics({ items: techCharacteristics.items, data: newTCData})
    }

    const addTC = () => {
        const newTCData: IProduct['techCharacteristics']['data'] = [...techCharacteristics.data];
        let newValues = techCharacteristics.items.map((): ITechCharacteristic['value'][0] => { return {id: -1, value: ''}})
        newTCData.push({id: -1, name: '', unit: '', value: newValues})
        setTechCharacteristics({items: techCharacteristics.items, data: newTCData})
    }

    const removeTC = (i: number) => {
        const newTCData: IProduct['techCharacteristics']['data'] = [...techCharacteristics.data];
        newTCData.splice(i, 1)
        setTechCharacteristics({items: techCharacteristics.items, data: newTCData})
    }

    return (
        <div>
            <OpenDiv title="Технические характеристики" toggleClasses={classes} refToggle={refTechCharacteristics} />
            <div ref={refTechCharacteristics} className={classes.techCharacteristicsDiv}>

                <div className={classes.products}>
                    <p>Продукция</p>
                    <p className={classes.sign}>*В случае, если нужны характеристики для нескольких товаров, идущих в комплекте.</p>
                    <div className={classes.addItem}>
                        { 
                            techCharacteristics.items.map((t, i) => 
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
                        <img onClick={addItem} src={plus.src} />
                    </div>
                    <div className={classes.characteristics}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Наименование</th>
                                    <th>Ед. изм.</th>
                                    {
                                        techCharacteristics.items.map((i, ind) => 
                                            <th key={ind}>{i.name}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    techCharacteristics.data.map((d, ind) => 
                                        <tr key={ind}>  
                                            <td><MyInput value={d.name} setValue={val => setData(val, "name", ind)} /></td>
                                            <td>
                                                <MySelect 
                                                    defaultValue={'-'} 
                                                    value={d.unit} 
                                                    options={unit.map(u => { return {name: u.value, value: u.value}})} 
                                                    change={value => setData(value, 'unit', ind)} 
                                                />
                                            </td>
                                            {
                                                techCharacteristics.items.map((_, indCol) => 
                                                    <td key={indCol}><MyInput value={d.value[indCol]?.value} setValue={val => setData(val, "value", ind, indCol)} /></td>
                                                )
                                            }
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