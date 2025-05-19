import { FC, useEffect, MouseEvent as MouseEventReact, useRef, useState } from "react";
import classes from './sliderImagesStatic.module.scss'

interface IProps {
    // showBlock: number;

    elements: React.ReactElement[];
    widthItem: number;
    ms?: number;

    // если важно, при внешнем выборе, ставить на 1 место выбранный эл-нт
        firstElem?: number;
        setFirstElem?: (firstElem: number) => void;
    //

    // чтобы предотвратить скролл при внешнем выборе
        firstElemChange?: boolean;  // true - значит был внешнее переключение картинки
        setFirstElemChange?: (f: boolean) => void;
    //

    // внешние фичи, отвечающие за скролл эл-ов
        refBackward?: React.RefObject<HTMLDivElement>;
        refForward?: React.RefObject<HTMLDivElement>;
    //

    // обработчик на эл-нт
        onClick?: (ind: number) => void;
    //

}

// const WIDTH = 280
const GAP = 30
const MS = 400
const SWAP_PX = 50

export const SliderImagesStatic: FC<IProps> = (
    {firstElem = 0, setFirstElem = () => {}, firstElemChange, setFirstElemChange = () => {}, ms = MS, onClick = () => {}, widthItem: WIDTH, elements, refBackward, refForward}
) => {

    const refContent = useRef<HTMLDivElement>(null)
    const refSliderImages = useRef<HTMLDivElement>(null)
    const refSliderBox = useRef<HTMLDivElement>(null)
    
    const [currentLeft, setCurrentLeft] = useState<number>(0)
    const [prevTime, setPrevTime] = useState<number>(0)
    const [SHOW_BLOCK, setSHOW_BLOCK] = useState<number>(0)
    
    const sliderWidth = (SHOW_BLOCK) * WIDTH + (SHOW_BLOCK) * GAP;

    function initLeft(curLeft?: number){
        if(refContent.current){
            const left = getLeft()
            refContent.current.style.transition = ''
            setTimeout(() => refContent!.current!.style.transition = `left ${ms}ms`)
            refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (curLeft === undefined ? currentLeft : curLeft)) + 'px'
        }
    }
    
    const isFirst = useRef<boolean>(true)
    useEffect(() => {
        if(isFirst.current){
            isFirst.current = false
            setCurrentLeft(firstElem)
        }
        else{
            if(firstElemChange){  // если поменялся внешнем способом (без скролла двигаем элементы к нужному firstElem)
                initLeft(firstElem)
                setCurrentLeft(firstElem)
            }
        }
    }, [firstElem])
    
    function getCountBlock(){
        const sliderBox = refSliderBox.current;
        if(sliderBox){
            const newWidthSlider = sliderBox.getBoundingClientRect().width
            const newCount = Math.floor(newWidthSlider / (WIDTH + GAP))
            return (elements.length > newCount ? newCount : elements.length)
        }
        return 0
    }
    
    function countBlock() {
        setSHOW_BLOCK(getCountBlock())
    }
    
    useEffect(() => {
        countBlock()
        window.addEventListener('resize', countBlock)
        return () => window.removeEventListener('resize', countBlock)
    }, [])
    
    
    
    
    const blockLeft = []
    for(let i = elements.length - 1; i >= (elements.length - SHOW_BLOCK); i--) {
        blockLeft.unshift(elements[i])
    }
    const blockRight = []
    for(let i = 0; i < SHOW_BLOCK; i++){
        blockRight.push(elements[i])
    }
    
    
    function getLeft(){
        const left = (SHOW_BLOCK) * WIDTH + (SHOW_BLOCK) * GAP;
        return left
    }
    
    const backwardChange = () => {
        setFirstElemChange(false)
        if(refContent.current){
            const left = getLeft()
            if(currentLeft === -SHOW_BLOCK){
                refContent.current!.style.transition = ''
                refContent.current!.style.left = - (left + (WIDTH + GAP) * (elements.length - SHOW_BLOCK)) + 'px';
                setTimeout(() => {
                    refContent.current!.style.left = - (left + (WIDTH + GAP) * (elements.length - SHOW_BLOCK - 1)) + 'px';
                    refContent.current!.style.transition = `left ${ms}ms`
                })
                setCurrentLeft(elements.length - SHOW_BLOCK - 1)
            }
            else{
                refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (currentLeft - 1)) + 'px'
                setCurrentLeft(currentLeft - 1)
            }
        }
    }
    
    const forwardChange = () => {
        setFirstElemChange(false)
        if(refContent.current){
            const left = getLeft()
            if(currentLeft === elements.length){
                refContent.current!.style.transition = ''
                refContent.current!.style.left = - left + 'px';
                setTimeout(() => {
                    refContent.current!.style.left = '-' + (left + (WIDTH + GAP)) + 'px'
                    refContent.current!.style.transition = `left ${ms}ms`
                })
                setCurrentLeft(1)
            }
            else {
                refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (currentLeft + 1)) + 'px'
                setCurrentLeft(currentLeft + 1)
            }
        }
    }
    
    const onBackward = (e: MouseEvent) => {
        e.preventDefault()
        
        const currentTime = Date.now()
        if((currentTime - prevTime) < ((ms - 100) > 0 ? (ms - 100) : 0)){
            return
        }
        setPrevTime(currentTime)
        backwardChange()
    }
    
    const onForward = (e: MouseEvent) => {
        e.preventDefault()
        const currentTime = Date.now()
        if((currentTime - prevTime) < ((ms - 100) > 0 ? (ms - 100) : 0)){
            return
        }
        setPrevTime(currentTime)
        forwardChange()
    }
    
    useEffect(() => {
        if(refSliderImages.current){
            refSliderImages.current.ondragstart = () => false
        }
        if(refContent.current && SHOW_BLOCK){
            initLeft()
        }
    }, [SHOW_BLOCK])
    

    useEffect(() => {
        if(currentLeft >= 0 && currentLeft < elements.length){  // для внешнего выбора задаем актуальные значения после скролла
            setFirstElem(currentLeft)
        } else if(currentLeft >= elements.length){
            setFirstElem(elements.length - currentLeft)
        } else{
            setFirstElem(elements.length + currentLeft)
        }
    }, [currentLeft])
    // #######
    
    // touch
    
    
    const stop = useRef<boolean>(false)
    
    useEffect(() => {
        const slider = refSliderImages.current;
        const backward = refBackward?.current;
        const forward = refForward?.current;
        
        // Добавляем новые обработчики
        if (slider) {
            slider.ondragstart = () => false;
            slider.onpointerdown = onMouseDown;
        }
        if (backward) {
            backward.onclick = onBackward;
        }
        if (forward) {
            forward.onclick = onForward;
        }

    }, [currentLeft, SHOW_BLOCK]);

    const [idTimeout, setIdTimeout] = useState<ReturnType<typeof setTimeout>>()
    function onMouseDown(eventMouseDown: MouseEvent) {
        eventMouseDown.preventDefault();
        document.body.style.touchAction = 'none'; 
        const initialX = eventMouseDown.clientX;

        document.body.addEventListener('pointermove', onMouseMove);
        document.body.addEventListener('pointerup', onMouseUp);

        function onMouseMove(e: MouseEvent) {
            e.preventDefault();
            const currentX = e.clientX;

            const currentTime = Date.now();
            if (currentTime - prevTime >= ms) {
                setPrevTime(currentTime);
                if (Math.abs(currentX - initialX) > SWAP_PX) {
                    stop.current = true;  // блокируем child клик (мб просто на move)
                    if (currentX < initialX) {
                        onMouseUp(e);
                        forwardChange();
                    } else {
                        onMouseUp(e);
                        backwardChange();
                    }
                }
            }
        }

        function onMouseUp(e: MouseEvent) {
            document.body.removeEventListener('pointermove', onMouseMove);
            document.body.removeEventListener('pointerup', onMouseUp);
            document.body.style.touchAction = ''; 
            clearTimeout(idTimeout)
            const id = setTimeout(() => {stop.current = false}, ms + 40)
            setIdTimeout(id)
        }
    }

    // ######

    const onClickHandle = (ind: number) => {
        if(stop.current){
            return
        }
        onClick(ind)
    }  

    return (
        <section ref={refSliderBox} style={{minWidth: WIDTH + GAP}} className={classes.sliderBox}>
            <section 
                ref={refSliderImages} 
                className={classes.sliderImages}
                style={{width: sliderWidth}}
            >  
                <section ref={refContent} className={classes.content} >
                    {blockLeft.map((element, ind) => 
                        <section 
                            onClick={() => onClickHandle(ind)}
                            className={classes.item} 
                            key={'a' + ind} 
                            style={{
                                minWidth: WIDTH,
                            }}
                        >
                            {element}
                        </section>
                    )}
                    {elements.map((element, ind) => 
                        <section 
                            onClick={() => onClickHandle(ind)}
                            className={classes.item} 
                            key={'b' + ind} 
                            style={{
                                minWidth: WIDTH,
                            }}
                        >
                            {element}
                        </section>
                    )}
                    {blockRight.map((element, ind) => 
                        <section 
                            onClick={() => onClickHandle(ind)}
                            className={classes.item} 
                            key={'c' + ind} 
                            style={{
                                minWidth: WIDTH,
                            }}
                        >
                            {element}
                        </section>
                    )}
                </section> 
            </section>
        </section>
    )
}