import { IProduct } from "@/src/entities/product";
import { FC, useRef } from "react";
import { OpenDiv } from "../openDiv/OpenDiv";
import classes from './productDeliverySet.module.scss'
import { MyTableAdmin } from "@/src/shared/components/myTableAdmin/MyTableAdmin";
import { MyInput } from "@/src/shared/components/myInput/MyInput";
import { AddRow, RemoveRow, SetData } from "../../lib/helpers/tableOperation";
import { MyButton } from "@/src/shared/components/myButtonAdmin/MyButtonAdmin";
import remove from '@/src/shared/lib/assets/x-close.png'

interface ProductDeliverySetProps {
    deliverySet: IProduct['deliverySet'];
    setDeliverySet: (deliverySet: IProduct['deliverySet']) => void;
}

export const ProductDeliverySet: FC<ProductDeliverySetProps> = ({deliverySet, setDeliverySet}) => {

    const refDeliverySet = useRef<HTMLDivElement>(null)
    const setData = SetData(deliverySet, setDeliverySet)
    const addRow = AddRow(deliverySet, {id: -1, name: '', numb: '1', note: ''}, setDeliverySet)
    const removeRow = RemoveRow(deliverySet, setDeliverySet)


    return (
        <div> 
            <OpenDiv title="Комплект поставки" refToggle={refDeliverySet} toggleClasses={classes} />
            <div ref={refDeliverySet} className={classes.deliverySetDiv}>
                <MyTableAdmin 
                    columns={['Наименование', 'Кол-во', 'Примечание']} 
                    tbody =
                    {
                        deliverySet.map((d, ind) => 
                            <tr key={ind}>
                                <td><MyInput value={d.name} setValue={val => setData(val, 'name', ind)}></MyInput></td>
                                <td><MyInput type="number" value={d.numb} setValue={val => setData(val, 'numb', ind)}></MyInput></td>
                                <td><MyInput value={d.note} setValue={val => setData(val, 'note', ind)}></MyInput></td>
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