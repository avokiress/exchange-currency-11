import countries from "countries-list"
import { createContext, useContext, useEffect, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const RegionContext = createContext(null)

export const getCurrency = (value) => {
    console.log('value', value)
    if(!!value && typeof value !== 'undefined') {
        const newRegion = Object.values(countries.countries).find(item => item.name === value)
        return newRegion.currency
    } else {
        return 'USD'
    }
}

export const useRegion = () => {
    return useContext(RegionContext)
}

export const RegionProvider = ({children}) => {
    const [region, {setItem}] = useLocalStorage('region')
    const [currency, setCurrency] = useState()

    const setRegion = (newRegion) => {
        setItem(newRegion)
        setCurrency(getCurrency(newRegion))
    }

    useEffect(() => {
        if(region) {
            setCurrency(getCurrency(region))
        }
    }, [region])

    const value = {
        region,
        currency,
        setRegion
    }

    return (
        <RegionContext.Provider value={value}>
            {children}
        </RegionContext.Provider>
    )
}