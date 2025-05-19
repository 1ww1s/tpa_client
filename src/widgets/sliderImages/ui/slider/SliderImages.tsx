import { FC, useEffect, MouseEvent as MouseEventReact, useRef, useState } from "react";
import classes from './sliderImages.module.scss'

interface IProps {
    elements: React.ReactElement[];
    ms?: number;

    // если важно, при внешнем выборе, ставить на 1 место выбранный эл-нт
        firstElem?: number;
        setFirstElem?: (firstElem: number) => void;
    //
    
    // обработчик на эл-нт
        onClick?: (ind: number) => void;
    //

    // внешние фичи, отвечающие за скролл эл-ов
        refBackward?: React.RefObject<HTMLDivElement>;
        refForward?: React.RefObject<HTMLDivElement>;
    //

    // чтобы предотвратить скролл при внешнем выборе
        firstElemChange?: boolean;  // true - значит был внешнее переключение картинки
        setFirstElemChange?: (f: boolean) => void;
    //
}

const GAP = 30
const MS = 400
const SWAP_PX = 50
const SHOW_BLOCK = 1

export const SliderImages: FC<IProps> = (
    {firstElem = 0, firstElemChange, setFirstElemChange = () => {}, ms = MS, onClick = () => {}, elements, refBackward, refForward, setFirstElem = () => {}}
) => {

    const refContent = useRef<HTMLDivElement>(null)
    const refSliderImages = useRef<HTMLDivElement>(null)
    const refSliderBox = useRef<HTMLDivElement>(null)

    const [currentLeft, setCurrentLeft] = useState<number>(0)
    const [prevTime, setPrevTime] = useState<number>(0)
    const [WIDTH, setWIDTH] = useState<number>(0)
    const sliderWidth = WIDTH ? (SHOW_BLOCK) * WIDTH : 0;


    // доп эл-ты по краям для скролла

    const blockLeft = []
    for(let i = elements.length - 1; i >= (elements.length - SHOW_BLOCK); i--) {
        blockLeft.unshift(elements[i])
    }
    const blockRight = []
    for(let i = 0; i < SHOW_BLOCK; i++){
        blockRight.push(elements[i])
    }

    //

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
    
    useEffect(() => {
        if(refSliderImages.current){
            refSliderImages.current.ondragstart = () => false
        }
        if(refContent.current && WIDTH){
            initLeft()
        }
    }, [WIDTH])  // инитиализация 


    function getLeft(){ // текущий скоролл
        const left = (SHOW_BLOCK) * WIDTH + (SHOW_BLOCK) * GAP;
        return left
    }


    // актуальная ширина item от ширины родителя

    function getWidthItem(){
        const sliderBox = refSliderBox.current;
        if(sliderBox){
            console.log(sliderBox.getBoundingClientRect().width)
            const newWidthSlider = sliderBox.getBoundingClientRect().width - 2 * GAP
            return newWidthSlider
        }
        return 0
    }
    
    function widthItem() {
        setWIDTH(getWidthItem())
    }
    
    useEffect(() => {
        widthItem()
        window.addEventListener('resize', widthItem)
        return () => window.removeEventListener('resize', widthItem)
    }, [])

    // 
        

    // скролл
    
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

    // 
    
    const onBackward = (e: MouseEvent) => { // проверка + действие  
        e.preventDefault()
        
        const currentTime = Date.now()
        if((currentTime - prevTime) < ((ms - 100) > 0 ? (ms - 100) : 0)){
            return
        }
        setPrevTime(currentTime)
        backwardChange()
    }
    
    const onForward = (e: MouseEvent) => { // проверка + действие 
        e.preventDefault()
        const currentTime = Date.now()
        if((currentTime - prevTime) < ((ms - 100) > 0 ? (ms - 100) : 0)){
            return
        }
        setPrevTime(currentTime)
        forwardChange()
    }
    
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

    }, [currentLeft, WIDTH]);

    useEffect(() => {
        if(currentLeft >= 0 && currentLeft < elements.length){  // для внешнего выбора задаем актуальные значения после скролла
            setFirstElem(currentLeft)
        } else if(currentLeft >= elements.length){
            setFirstElem(elements.length - currentLeft)
        } else{
            setFirstElem(elements.length + currentLeft)
        }
    }, [currentLeft])
    

    const [idTimeout, setIdTimeout] = useState<ReturnType<typeof setTimeout>>()
    function onMouseDown(eventMouseDown: MouseEvent) {
        eventMouseDown.preventDefault();
        const initialX = eventMouseDown.clientX;
        
        document.body.addEventListener('pointermove', onMouseMove);
        document.body.addEventListener('pointerup', onMouseUp);

        function onMouseMove(e: MouseEvent) {
            e.preventDefault();
            const currentX = e.clientX;
            
            const currentTime = Date.now();
            if (currentTime - prevTime >= ms) {
                setPrevTime(currentTime);
                if (Math.abs(currentX - initialX) > SWAP_PX) {  // возможно случайный клик (нужно больше провести мышкой (пальцем))
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
            clearTimeout(idTimeout)
            const id = setTimeout(() => {stop.current = false}, ms + 40) // дожидаемя конца скролла
            setIdTimeout(id)
        }
    }

    // ######

    const onClickHandle = (ind: number) => {  // если стоит внеший обработчик на элементе. Предотвращаем клик при скролле
        if(stop.current){
            return
        }
        onClick(ind)
    }  

    return (
        <section ref={refSliderBox} className={classes.sliderBox}>
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















// import { FC, useEffect, MouseEvent as MouseEventReact, useRef, useState } from "react";
// import classes from './sliderImages.module.scss'

// interface IProps {
//     height?: number;
//     showBlock: number;
//     elements: React.ReactElement[]
//     refBackeard?: React.RefObject<HTMLDivElement>;
//     refForward?: React.RefObject<HTMLDivElement>;
// }

// const WIDTH = 120
// const GAP = 30
// const MS = 400
// const SWAP_PX = 50

// export const SliderImages: FC<IProps> = ({height = 300, elements, refBackeard, refForward, showBlock}) => {

//     const [ready, setReady] = useState<boolean>(false)

//     useEffect(() => {
//         setSHOW_BLOCK(elements.length > showBlock ? showBlock : elements.length)
//     }, [showBlock])
//     // по кнопкам

//     const refContent = useRef<HTMLDivElement>(null)
//     const refSliderImages = useRef<HTMLDivElement>(null)
//     const [SHOW_BLOCK, setSHOW_BLOCK] = useState<number>(elements.length > showBlock ? showBlock : elements.length)
    
//     const [WIDTH, setWidth] = useState<number>(0)

//     const left = (SHOW_BLOCK) * WIDTH + (SHOW_BLOCK) * GAP;

//     const blockLeft = []
//     for(let i = elements.length - 1; i >= (elements.length - SHOW_BLOCK); i--) {
//         blockLeft.unshift(elements[i])
//     }
//     const blockRight = []
//     for(let i = 0; i < SHOW_BLOCK; i++){
//         blockRight.push(elements[i])
//     }

//     const [currentLeft, setCurrentLeft] = useState<number>(0)
//     const [prevTime, setPrevTime] = useState<number>(0)

//     const backwardChange = () => {
//         if(refContent.current){
//             if(currentLeft === -SHOW_BLOCK){
//                 refContent.current!.style.transition = ''
//                 refContent.current!.style.left = - (left + (WIDTH + GAP) * (elements.length - SHOW_BLOCK)) + 'px';
//                 setTimeout(() => {
//                     refContent.current!.style.left = - (left + (WIDTH + GAP) * (elements.length - SHOW_BLOCK - 1)) + 'px';
//                     refContent.current!.style.transition = `left ${MS - 40}ms`
//                 }, 40)
//                 setCurrentLeft(elements.length - SHOW_BLOCK - 1)
//             }
//             else{
//                 refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (currentLeft - 1)) + 'px'
//                 setCurrentLeft(currentLeft - 1)
//             }
//         }
//     }

//     const forwardChange = () => {
//         if(refContent.current){
//             if(currentLeft === elements.length){
//                 refContent.current!.style.transition = ''
//                 refContent.current!.style.left = - left + 'px';
//                 setTimeout(() => {
//                     refContent.current!.style.left = '-' + (left + (WIDTH + GAP)) + 'px'
//                     refContent.current!.style.transition = `left ${MS - 40}ms`
//                 }, 40)
//                 setCurrentLeft(1)
//             }
//             else {
//                 refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (currentLeft + 1)) + 'px'
//                 setCurrentLeft(currentLeft + 1)
//             }
//         }
//     }

//     const onBackward = (e: MouseEvent) => {
//         e.preventDefault()

//         const currentTime = Date.now()
//         if(currentTime - prevTime < MS){
//             return
//         }
//         setPrevTime(currentTime)
//         backwardChange()
//     }

//     const onForward = (e: MouseEvent) => {
//         e.preventDefault()
//         const currentTime = Date.now()
//         if(currentTime - prevTime < MS){
//             return
//         }
//         setPrevTime(currentTime)
//         forwardChange()
//     }

//     const isOne = useRef<boolean>(true)
//     useEffect(() => {
//         if(refSliderImages.current){
//             refSliderImages.current.ondragstart = () => false
//             // refSliderImages.current.style.width = sliderWidth + 'px'
//         }
//         if(refContent.current){
//             if(!isOne.current){
//                 setReady(true)
//                 refContent.current.style.transition = `left ${MS - 40}ms`
//                 refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (currentLeft)) + 'px'
//             }
//             else{
//                 refContent.current.style.transition = ''
//                 isOne.current = false;
//             }
//         }
//     }, [WIDTH])
    
//     // #######

//     // touch
    
//     useEffect(() => {
//         if(refSliderImages.current){
//             refSliderImages.current.ondragstart = function() {
//                 return false;
//             };
//             refSliderImages.current.onpointerdown = onMouseDown
//         }
//         if(refBackeard?.current){
//             refBackeard.current.onclick = onBackward
//         }
//         if(refForward?.current){
//             refForward.current.onclick = onForward
//         }
//     }, [currentLeft, WIDTH])

//     const stop = useRef<boolean>(false)

//     function onMouseDown (e: MouseEvent) {
//         e.preventDefault()
//         document.body.style.touchAction = 'none'; // Блокируем скролл
//         stop.current = false
//         const inititalX = e.clientX;

//         if(refContent.current){
//             document.body.addEventListener('pointermove', onMouseMove)
//             document.body.addEventListener('pointerup', onMouseUp)
//             let action: boolean = false;
//             function onMouseMove(e: MouseEvent) {
//                 e.preventDefault()
//                 stop.current = true
//                 const currentX = e.clientX;
//                 if(!action){
//                     const currentTime = Date.now()
//                     if(currentTime - prevTime >= MS){
//                         setPrevTime(currentTime)
//                         if((Math.abs(currentX - inititalX)) > SWAP_PX){
//                             action = true;
//                             if(currentX < inititalX){
//                                 onMouseUp()
//                                 forwardChange()
//                             }
//                             else{
//                                 onMouseUp()
//                                 backwardChange()
//                             }
//                         }
//                     }
//                 }
//             }

//             function onMouseUp() {
//                 document.body.style.touchAction = ''; // Блокируем скролл
//                 document.body.removeEventListener('pointerup', onMouseUp)
//                 document.body.removeEventListener('pointermove', onMouseMove) 
                
//             }
//         }
//     }

//     // ######

//     // resize


//     useEffect(() => {
//         const checkScreenSize = () => {
//             // const totalWidth = SHOW_BLOCK * WIDTH + (SHOW_BLOCK - 1) * GAP;
//             if(refContent.current){
//                 const totalWidth = (refContent.current.getBoundingClientRect().width)
//                 const newWidth = +(((totalWidth - ((SHOW_BLOCK - 1) * GAP)) / SHOW_BLOCK).toFixed(2))
//                 setWidth(newWidth)
//             }
//         };
//         // Проверяем сразу при загрузке
//         checkScreenSize();
        
//         // Добавляем слушатель на изменение размера
//         window.addEventListener('resize', checkScreenSize);
        
//         // Убираем слушатель при размонтировании
//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, [SHOW_BLOCK]);



//     return (
//         <section 
//             style={{height}}
//             className={classes.sliderBox + (ready ? (' ' + classes.ready) : '')}
//         >
//             <section ref={refSliderImages} className={classes.sliderImages}>  
//                 <section ref={refContent} className={classes.content} >
//                     {blockLeft.map((element, ind) => 
//                         <section 
//                             className={classes.item} 
//                             key={'a' + ind} 
//                             style={{
//                                 minWidth: WIDTH,
//                             }}
//                         >
//                             {element}
//                         </section>
//                     )}
//                     {elements.map((element, ind) => 
//                         <section 
//                             className={classes.item} 
//                             key={'b' + ind} 
//                             style={{
//                                 minWidth: WIDTH,
//                             }}
//                         >
//                             {element}
//                         </section>
//                     )}
//                     {blockRight.map((element, ind) => 
//                         <section 
//                             className={classes.item} 
//                             key={'c' + ind} 
//                             style={{
//                                 minWidth: WIDTH,
//                             }}
//                         >
//                             {element}
//                         </section>
//                     )}
//                 </section> 
//             </section>
//         </section>
//     )
// }




// import { FC, useEffect, MouseEvent as MouseEventReact, useRef, useState } from "react";
// import classes from './sliderImages.module.scss'

// interface IProps {
//     elements: React.ReactElement[]
//     onClick: (ind: number) => void;
//     refBackeard?: React.RefObject<HTMLDivElement>;
//     refForward?: React.RefObject<HTMLDivElement>;
// }

// const WIDTH = 120
// const GAP = 30
// const MS = 300
// const SHOW_BLOCK_STANDART = 4
// const SWAP_PX = 50

// export const SliderImages: FC<IProps> = ({onClick, elements, refBackeard, refForward}) => {

//     // по кнопкам

//     const [SHOW_BLOCK, setSHOW_BLOCK] = useState<number>(elements.length > SHOW_BLOCK_STANDART ? SHOW_BLOCK_STANDART : elements.length)

//     const sliderWidth = SHOW_BLOCK * WIDTH + (SHOW_BLOCK - 1) * GAP;
//     const left = (SHOW_BLOCK) * WIDTH + (SHOW_BLOCK) * GAP;

//     const blockLeft = []
//     for(let i = elements.length - 1; i >= (elements.length - SHOW_BLOCK); i--) {
//         blockLeft.unshift(elements[i])
//     }
//     const blockRight = []
//     for(let i = 0; i < SHOW_BLOCK; i++){
//         blockRight.push(elements[i])
//     }

//     const refContent = useRef<HTMLDivElement>(null)
//     const refSliderImages = useRef<HTMLDivElement>(null)

//     const [currentLeft, setCurrentLeft] = useState<number>(0)
//     const [prevTime, setPrevTime] = useState<number>(0)

//     const backwardChange = () => {
//         if(refContent.current){
//             if(currentLeft === -SHOW_BLOCK){
//                 refContent.current!.style.transition = ''
//                 refContent.current!.style.left = - (left + (WIDTH + GAP) * (elements.length - SHOW_BLOCK)) + 'px';
//                 setTimeout(() => {
//                     refContent.current!.style.left = - (left + (WIDTH + GAP) * (elements.length - SHOW_BLOCK - 1)) + 'px';
//                     refContent.current!.style.transition = `left ${MS - 40}ms ease-in-out`
//                 }, 40)
//                 setCurrentLeft(elements.length - SHOW_BLOCK - 1)
//             }
//             else{
//                 refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (currentLeft - 1)) + 'px'
//                 setCurrentLeft(currentLeft - 1)
//             }
//         }
//     }

//     const forwardChange = () => {
//         if(refContent.current){
//             if(currentLeft === elements.length){
//                 refContent.current!.style.transition = ''
//                 refContent.current!.style.left = - left + 'px';
//                 setTimeout(() => {
//                     refContent.current!.style.left = '-' + (left + (WIDTH + GAP)) + 'px'
//                     refContent.current!.style.transition = `left ${MS - 40}ms ease-in-out`
//                 }, 40)
//                 setCurrentLeft(1)
//             }
//             else {
//                 refContent.current.style.left = '-' + (left + (WIDTH + GAP) * (currentLeft + 1)) + 'px'
//                 setCurrentLeft(currentLeft + 1)
//             }
//         }
//     }

//     const onBackward = (e: MouseEvent) => {
//         e.preventDefault()

//         const currentTime = Date.now()
//         if(currentTime - prevTime < MS){
//             return
//         }
//         setPrevTime(currentTime)
//         backwardChange()
//     }

//     const onForward = (e: MouseEvent) => {
//         e.preventDefault()
//         const currentTime = Date.now()
//         if(currentTime - prevTime < MS){
//             return
//         }
//         setPrevTime(currentTime)
//         forwardChange()
//     }

//     useEffect(() => {
//         if(refSliderImages.current){
//             refSliderImages.current.ondragstart = () => false
//             refSliderImages.current.style.width = sliderWidth + 'px'
//         }
//         if(refContent.current){
//             refContent.current.style.left = '-' + left + 'px'
//             refContent.current.style.transition = `left ${MS - 40}ms ease-in-out`
//         }
//     }, [])
    
//     // #######

//     // touch
    
//     useEffect(() => {
//         if(refSliderImages.current){
//             refSliderImages.current.ondragstart = function() {
//                 return false;
//             };
//             refSliderImages.current.onpointerdown = onMouseDown
//         }
//         if(refBackeard?.current){
//             refBackeard.current.onclick = onBackward
//         }
//         if(refForward?.current){
//             refForward.current.onclick = onForward
//         }
//     }, [currentLeft])

//     const stop = useRef<boolean>(false)

//     function onMouseDown (e: MouseEvent) {
//         e.preventDefault()
//         document.body.style.touchAction = 'none'; // Блокируем скролл
//         stop.current = false
//         const inititalX = e.clientX;

//         if(refContent.current){
//             document.body.addEventListener('pointermove', onMouseMove)
//             document.body.addEventListener('pointerup', onMouseUp)
//             let action: boolean = false;
//             function onMouseMove(e: MouseEvent) {
//                 e.preventDefault()
//                 stop.current = true
//                 const currentX = e.clientX;
//                 if(!action){
//                     const currentTime = Date.now()
//                     if(currentTime - prevTime >= MS){
//                         setPrevTime(currentTime)
//                         if((Math.abs(currentX - inititalX)) > SWAP_PX){
//                             action = true;
//                             if(currentX < inititalX){
//                                 onMouseUp()
//                                 forwardChange()
//                             }
//                             else{
//                                 onMouseUp()
//                                 backwardChange()
//                             }
//                         }
//                     }
//                 }
//             }

//             function onMouseUp() {
//                 document.body.style.touchAction = ''; // Блокируем скролл
//                 document.body.removeEventListener('pointerup', onMouseUp)
//                 document.body.removeEventListener('pointermove', onMouseMove) 
                
//             }
//         }
//     }

//     // ######

//     // resize


//     useEffect(() => {
//         const checkScreenSize = () => {
//             const totalWidth = SHOW_BLOCK * WIDTH + (SHOW_BLOCK - 1) * GAP;
            
//             if(window.innerWidth <= 650){
//                 console.log(totalWidth, window.innerWidth)
//             }
//         };
        
//         // Проверяем сразу при загрузке
//         checkScreenSize();
        
//         // Добавляем слушатель на изменение размера
//         window.addEventListener('resize', checkScreenSize);
        
//         // Убираем слушатель при размонтировании
//         return () => window.removeEventListener('resize', checkScreenSize);
//     }, []);



//     return (
//         <section className={classes.sliderBox}>
//             <section ref={refSliderImages} className={classes.sliderImages}>  
//                 <section ref={refContent} className={classes.content}>
//                     {blockLeft.map((element, ind) => 
//                         <section 
//                             className={classes.item} 
//                             key={'a' + ind} 
//                         >
//                             {element}
//                         </section>
//                     )}
//                     {elements.map((element, ind) => 
//                         <section 
//                             className={classes.item} 
//                             key={'b' + ind} 
//                         >
//                             {element}
//                         </section>
//                     )}
//                     {blockRight.map((element, ind) => 
//                         <section 
//                             className={classes.item} 
//                             key={'c' + ind} 
//                         >
//                             {element}
//                         </section>
//                     )}
//                 </section> 
//             </section>
//         </section>
//     )
// }











// import { FC, useEffect, useRef, useState } from "react";
// import classes from './sliderImages.module.scss'

// interface IProps {
//     imgs: string[]
// }

// const WIDTH = 120
// const GAP = 30
// const MS = 100
// const SHOW_BLOCK_STANDART = 4

// export const SliderImages: FC<IProps> = ({imgs}) => {

//     const SHOW_BLOCK = imgs.length > SHOW_BLOCK_STANDART ? SHOW_BLOCK_STANDART : imgs.length;

//     const sliderWidth = SHOW_BLOCK * WIDTH + (SHOW_BLOCK - 1) * GAP;
//     const left = (SHOW_BLOCK) * WIDTH + (SHOW_BLOCK) * GAP;
//     const [orientation, setOrientation] = useState<'left' | 'right'>('left')

//     const blockLeft = []
//     for(let i = imgs.length - 1; i >= (imgs.length - SHOW_BLOCK); i--) {
//         blockLeft.unshift(imgs[i])
//     }
//     const blockRight = []
//     for(let i = 0; i < SHOW_BLOCK; i++){
//         blockRight.push(imgs[i])
//     }


//     const refContent = useRef<HTMLDivElement>(null)
//     const refSliderImages = useRef<HTMLDivElement>(null)

//     const [currentLeft, setCurrentLeft] = useState<number>(1)
//     const [prevTime, setPrevTime] = useState<number>(0)

//     const backwardChange = () => {
//         if(refContent.current){
//             console.log(currentLeft)
//             if(currentLeft === SHOW_BLOCK){
//                 refContent.current!.style.transition = ''
//                 refContent.current!.style.left = - (imgs.length + 1) * WIDTH - (imgs.length + 1) * GAP + 'px';
//                 setTimeout(() => {
//                     refContent.current!.style.left = - (imgs.length) * WIDTH - (imgs.length) * GAP + 'px';
//                     refContent.current!.style.transition = `left ${MS}ms ease-in-out`
//                 })
//                 setCurrentLeft(SHOW_BLOCK - imgs.length + 1)
//             }
//             else if(currentLeft > SHOW_BLOCK){  // после forward
//                 alert(currentLeft - SHOW_BLOCK)
//                 refContent.current!.style.transition = ''
//                 refContent.current!.style.left = - (currentLeft - SHOW_BLOCK + 1) * WIDTH - (currentLeft - SHOW_BLOCK + 1) * GAP + 'px';
//                 setTimeout(() => {
//                     refContent.current!.style.left = - (currentLeft - SHOW_BLOCK) * WIDTH - (currentLeft - SHOW_BLOCK) * GAP + 'px';
//                     refContent.current!.style.transition = `left ${MS}ms ease-in-out`
//                 })
//                 setCurrentLeft(imgs.length - (currentLeft - SHOW_BLOCK + 1))
//             } else{
//                 refContent.current.style.left = '-' + (left - (WIDTH + GAP) * currentLeft) + 'px'
//                 setCurrentLeft(currentLeft + 1)
//             }
//         }
//     }

//     const forwardChange = () => {
//         console.log(currentLeft)
//         if(refContent.current){
//             if(currentLeft === imgs.length + 1){
//                 refContent.current!.style.transition = ''
//                 refContent.current!.style.left = - left + 'px';
//                 setTimeout(() => {
//                     refContent.current!.style.left = '-' + (left + (WIDTH + GAP)) + 'px'
//                     refContent.current!.style.transition = `left ${MS}ms ease-in-out`
//                 })
//                 setCurrentLeft(2)
//             }
//             else {
//                 console.log(refContent.current!.getBoundingClientRect().left)
//                 refContent.current.style.left = '-' + (left + (WIDTH + GAP) * currentLeft) + 'px'
//                 setCurrentLeft(currentLeft + 1)
//             }
//         }
//     }

//     const onBackward = () => {
//         const currentTime = Date.now()
//         if(currentTime - prevTime < MS){
//             return
//         }
//         setPrevTime(currentTime)
//         backwardChange()
//     }

//      const onForward = () => {
//         const currentTime = Date.now()
//         if(currentTime - prevTime < MS){
//             return
//         }
//         setPrevTime(currentTime)
//         forwardChange()
//     }

//     useEffect(() => {
//         if(refSliderImages.current){
//             refSliderImages.current.style.width = sliderWidth + 'px'
//         }
//         if(refContent.current){
//             refContent.current.style.left = '-' + left + 'px'
//             refContent.current.style.transition = `left ${MS}ms ease-in-out`
//         }
//     }, [])

//     return (
//         <section ref={refSliderImages} className={classes.sliderImages}>  
//             <section onClick={onBackward} className={classes.backward}>назад</section>
//             <section ref={refContent} className={classes.content}>
//                 {blockLeft.map((img, ind) => 
//                     <img src={img} key={'a' + ind} alt={`1 - ${ind}`} />
//                 )}
//                 {imgs.map((img, ind) => 
//                     <img src={img} key={'b' + ind} alt={`2 - ${ind}`} />
//                 )}
//                 {blockRight.map((img, ind) => 
//                     <img src={img} key={'c' + ind} alt={`3 - ${ind}`} />
//                 )}
//             </section> 
//             <section onClick={onForward} className={classes.forward}>вперед</section>
//         </section>
//     )
// }