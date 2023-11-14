import React from 'react'
import { useUserContext } from '../Contexts/UserContext'
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    const { isInitialized } = useUserContext();

    return (
        !isInitialized ? (
            <div style={{ width: '100vw', height: '100vh', position: 'fixed', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>Loading...</div>
        ) : <Outlet/>
    )
}
