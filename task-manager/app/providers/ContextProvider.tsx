"use client"

import { useEffect, useState } from 'react';
import { GlobalProvider } from '../context/globalProvider';

interface Props {
    children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {

    const [isReady, SetIsReady] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            SetIsReady(true);
        }, 200)
    }, [])

    if (!isReady) return null;

    return (
        <GlobalProvider>
            {children}
        </GlobalProvider>
    )
}

export default ContextProvider