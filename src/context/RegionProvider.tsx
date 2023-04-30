import { createContext, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

interface regionState {
    region: string
    setRegion: (value: string) => void
}

const RegionContext = createContext<string | null>(null)

export const useRegion = () => {
    return useContext(RegionContext)
}

export const RegionProvider = ({children}) => {
    const [region, {setItem}] = useLocalStorage('region')

    const setRegion = (value: string) => {
        setItem(value)
    }

    const value: regionState = {
        region,
        setRegion
    }

    return (
        <RegionContext.Provider value={value}>
            {children}
        </RegionContext.Provider>
    )
}