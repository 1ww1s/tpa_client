

export const setErrorTime = (error: string, setError: (error: string) => void, time: number) => {
    setError(error)
    setTimeout(() => setError(''), time)
}