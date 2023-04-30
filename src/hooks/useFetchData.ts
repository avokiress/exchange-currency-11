import axios from "axios"
import { useEffect, useState } from "react"

interface fetchData <T>{
    data: T | null,
    isLoading: boolean
    error: boolean
}

export const useFetchData = <T>(url: string): fetchData<T> => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const getData = () => {
        setIsLoading(true)
        axios.get(url)
        .then(res => {
            console.log(res.data)
            setData(res.data)
            setIsLoading(false)
        })
        .catch(error => {
            if(axios.isCancel(error)) {
                return
            }
            setError(true)
            setIsLoading(false)
            console.error('Error', error)
        })
    }
    

    useEffect(() => {
        getData()
    }, [url])

    return {
        data,
        isLoading,
        error
    }
}