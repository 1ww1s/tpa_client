import { Reorder } from "framer-motion"
import classes from './swapItems.module.scss'

interface SwapItemsProps<T> {
    items: T[];
    setItems: (items: T[]) => void;
}

export function SwapItems<T extends {name: string}>({items, setItems}: SwapItemsProps<T>) {

    return (
        <div className={classes.swapItems}>
            <Reorder.Group as='ol' axis="y" values={items} onReorder={setItems}>
                    {items.map((item) => (
                        <Reorder.Item key={item.name} value={item}>
                            <span>{item.name}</span>
                        </Reorder.Item>
                    ))}
            </Reorder.Group>
        </div>
    )
}