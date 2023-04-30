import { createContext, useContext, useState } from "react";

type HistoryItem = {
    from: string,
    to: string,
    amount: string,
    result: string,
    dateAdd: Date
}

type HistoryContextType = {
    add: (from: string, to: string, amount: string, result: string) => void,
    history: HistoryItem[],
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HistoryContext = createContext<HistoryContextType | null>(null);

export const useHistory = () => {
    const contextValue = useContext(HistoryContext);
    if (!contextValue) {
        throw Error("Context has not been Provided!");
    }
    return contextValue;
};

type Props = {
    children?: React.ReactNode;
}

export default function HistoryProvider({ children }: Props) {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const add = function (from: string, to: string, amount: string, result: string) {
        const newItem = {
            from,
            to,
            amount,
            result,
            dateAdd: new Date()
        };
        setHistory(prevState => ([newItem, ...prevState]));
    }
    const value = {
        add,
        history,
        open,
        setOpen
    }

    return (<HistoryContext.Provider value={value} >{children}</HistoryContext.Provider>);
}