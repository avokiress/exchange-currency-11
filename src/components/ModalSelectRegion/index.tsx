import countries from "countries-list"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { useFetchData } from "../../hooks/useFetchData"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select } from "@mui/material";

interface ipConfig {
    ip: string,
    network: string,
    version: string,
    city: string,
    region: string,
    region_code: string,
    country: string,
    country_name: string,
    country_code: string,
    country_code_iso3: string,
    country_capital: string,
    country_tld: string,
    continent_code: string,
    in_eu: boolean,
    postal: string,
    latitude: number,
    longitude: number,
    timezone: string,
    utc_offset: string,
    country_calling_code: string,
    currency: string,
    currency_name: string,
    languages: string,
    country_area: number,
    country_population: number,
    asn: string,
    org: string
}

const ModalSelectRegion = () => {
    const [region, {setItem}] = useLocalStorage('region')
    const [countryName, setCountryName] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {data: result, isLoading, error} = useFetchData<ipConfig>('https://ipapi.co/json/')

    const hundlerChange = (value: any) => {
        setCountryName(value.target.value)
    }

    const saveRegion = () => {
        setItem(countryName ?? '')
        setIsOpen(false)
    }
    
    useEffect(() => {
        if(!region && result && typeof result === 'object' && result?.country_name) {
            setCountryName(result?.country_name)
            setIsOpen(true)
        } else {
            setCountryName(typeof region === 'string' ? region : '')
        }
    }, [result])

    return (
        <>
        <div>
            <Button onClick={() => setIsOpen(true)}>Select region</Button>
            {typeof region === 'string' && region}
        </div>
        {(!isLoading && !error) &&
            <Dialog
                open={isOpen}
            >
                <DialogTitle>Select region</DialogTitle>
                <DialogContent>
                    <DialogContentText >Select region of residence</DialogContentText>
                    <Select onChange={hundlerChange} value={countryName}>
                        {Object.values(countries.countries).map((item) => {
                            const name: string = item.name
                            return (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            )
                        })}
                        {/* {countries.continents.map(item => )} */}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveRegion}>
                        Select
                    </Button>
                </DialogActions>
                
            </Dialog>
        }
        </>
    )

}

export default ModalSelectRegion