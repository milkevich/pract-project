import { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext(true)

const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState(true)

    const changeTheme = () => {
        setTheme(!theme)
    }
    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}            
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider