import {useState, useEffect, useContext, createContext} from 'react'

type AuthContext = {
    email: string,
    password: string;
}


const AuthContext = createContext<AuthContext>()

