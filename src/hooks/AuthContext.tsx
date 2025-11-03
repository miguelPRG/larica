import {useState, useEffect, useContext, createContext, type ReactElement} from 'react'
import { auth } from '../apis/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type User = {
    nome: string,
    telefone: string,
    email: string
}

type AuthContextType = {
    isLoading: boolean,
    user: User | null,
    login: (email: string, password: string) => Promise<void>,
    logout?: () => Promise<void>,
    register: (email: string, password: string, nome: string, telefone: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactElement}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // onAuthStateChanged é chamado IMEDIATAMENTE com o estado atual
        // E depois sempre que houver mudanças
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    nome: firebaseUser.displayName || '',
                    telefone: firebaseUser.phoneNumber || '',
                    email: firebaseUser.email || ''
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        // Retorna a função de cleanup (não a chama!)
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            setUser({
                nome: firebaseUser.displayName || '',
                telefone: firebaseUser.phoneNumber || '',
                email: firebaseUser.email || ''
            });
        } catch (error: any) {
            console.error("Erro ao logar:", error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, nome: string, telefone: string) => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Atualiza o perfil do usuário com o nome
            await updateProfile(userCredential.user, {
                displayName: nome
            });
            
            setUser({
                nome: nome,
                telefone: telefone,
                email: userCredential.user.email || ''
            });

        } catch (error: any) {
            console.error("Erro ao registrar:", error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        setIsLoading(true);
        try {
            await auth.signOut();
            setUser(null);
        } catch (error: any) {
            console.error("Erro ao deslogar:", error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <AuthContext.Provider value={{ isLoading, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

