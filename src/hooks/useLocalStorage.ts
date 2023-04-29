import { useState } from "react"

type dataNull = undefined | null

interface functions<T> {
    setItem: (newData: T) => void,
    removeItem: () => void,
    getItem: () => void
}

export const useLocalStorage = <T extends string | object>(name: string, data: T | dataNull): [string | T, functions<T>] => {
    const [state, setState] = useState(data ? data : '')

    const setItem = (newData: T): void => {
        setState(newData)  
        localStorage.setItem(name, typeof newData === 'object' ? JSON.stringify(newData) : newData  )
    }

    const removeItem = (): void => {
        setState('')
        localStorage.removeItem(name)
    }

    const getItem = (): void => {
        const result = localStorage.getItem(name)
        setState(() => typeof result === 'string' ? JSON.parse(result) : '')
    }

    return [state, {
        setItem,
        removeItem,
        getItem
    }]
}