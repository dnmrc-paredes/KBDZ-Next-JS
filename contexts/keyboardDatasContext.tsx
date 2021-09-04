import React, { createContext, useContext, useState, useEffect, FC } from "react";
import { onSnapshot, collection } from "@firebase/firestore";

// Firebase
import { firebaseDB } from "../firebase/client";

// Classes
import { KeyboardSpecs } from "../classes/keyboard-specs";

// Types
import { Ikeyboard } from "../types/types";

const DataContext = createContext({})

export const DataProvider: FC = ({children}) => {

    const [data, setData] = useState<Ikeyboard[]>([])

    useEffect(() => {

        const unsub = onSnapshot(collection(firebaseDB, 'keyboards'), (snapshot) => {
            snapshot.docChanges().forEach(item => {
                const {brand, id, name, weight, usbConnector, stocks, price, switches, } = item.doc.data() as { id: string | number, name: string, brand: string, price: number, stocks: number, weight: string, switches: string, usbConnector: string }
                const newData = new KeyboardSpecs(item.doc.id, id, name, brand, weight, usbConnector, switches, price, stocks)

                if (item.type === 'added') {
                    setData(prevData => [
                        ...prevData.sort(() => 1),
                        newData
                    ])
                    return
                }
                
                if (item.type === 'modified') {
                    setData(prevData => [
                        ...prevData.filter(item => item.uid !== newData.uid).sort(() => 1),
                        newData
                    ])
                    return
                }
                
                if (item.type === 'removed') {
                    setData(prevData => [
                        ...prevData.filter(item => item.uid !== newData.uid)
                    ])
                    return
                }
            })
        })

        return unsub
    }, [])

    const value = {
        data
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

} 

export const useKeyboardData = () => useContext(DataContext)