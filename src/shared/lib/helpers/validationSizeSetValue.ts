export const validationSizeSetValue = ( 
    maxSize: number,
    setError: (value: string) => void, 
    setValue: (value: string) => void) =>
{
    return function(value: string){
        if(value.length > maxSize) {
            setError(`Превышено допустимое кол-во символом (${maxSize})`)
        }
        else {
            setError('')
        }
        setValue(value.slice(0, maxSize))
    }
}