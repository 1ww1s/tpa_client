import { FC, ReactNode } from "react";
import classes from './timeline.module.scss'
import arrowLeft from '@/src/shared/lib/assets/arrow-left.png'

interface TimelineProps {
    widgets:   ReactNode[];
    isLoading?: boolean;
    selectedWidget: number;
    setSelectedWidget: (value: number) => void;
}

export const Timeline: FC<TimelineProps> = ({selectedWidget, setSelectedWidget, widgets, isLoading = false}) => {

    const begin = () => {
        setSelectedWidget(0)
    }

    const selected = (ind: number) => {
        if((ind > selectedWidget)) return
        // setSelectedWidget(ind)
    }

    return (
        <div className={classes.Timeline}>
            <div className={classes.nav}>
                { 
                    Boolean(selectedWidget)
                        &&
                    <div className={classes.backward}>
                        <img  src={arrowLeft.src} />
                        <span onClick={begin}>Вернуться в начало</span>
                    </div>
                }
                <div className={classes.navLine}>
                    {widgets.map((p, ind) => 
                        <span 
                            data-loading={isLoading && (ind === selectedWidget + 1)}
                            data-disabled={(ind > selectedWidget)} 
                            data-selected={(ind === selectedWidget && !isLoading)} 
                            onClick={() => selected(ind)} 
                            key={ind} 
                        />
                    )}
                </div>
            </div>
            <div className={classes.content}>
                {widgets[selectedWidget]}
            </div>
        </div>
    )
}