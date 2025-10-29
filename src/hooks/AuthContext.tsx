import {useState, useEffect, useContext, createContext} from 'react'

type AuthContext = {
    username: string
    login: (email: string, password: string) => Promise<void>
}


const AuthContext = createContext<AuthContext | undefined>(undefined)

export const AuthProvider = ({children}: {children: any}) =>{

    const [isLoading, setIsLoading] = useState(true);

}

