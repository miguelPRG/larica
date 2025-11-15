import { create } from "zustand";
import { auth } from "../apis/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type User = {
  nome: string;
  telefone: string;
  email: string;
};

type AuthState = {
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, nome: string, telefone: string) => Promise<void>;
  initialize: () => () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: true,
  user: null,

  initialize: () => {
    // A função auth.onAuthStateChanged é um listener que é ativado quando o estado de autenticação do firebase(ex: login, logout, etc). Esse listener mudará o estado global do user quando necessário
    // Depois disso retorna uma função de unsubscribe para limpar o event listener que será utilizada pelo App.tsx que é o consumidor da função initialize
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        set({
          user: {
            nome: firebaseUser.displayName || "",
            telefone: firebaseUser.phoneNumber || "",
            email: firebaseUser.email || "",
          },
          isLoading: false,
        });
      } else {
        set({ user: null, isLoading: false });
      }
    });
    return unsubscribe;
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      set({
        user: {
          nome: firebaseUser.displayName || "",
          telefone: firebaseUser.phoneNumber || "",
          email: firebaseUser.email || "",
        },
      });
    } catch (error: any) {
      console.error("Erro ao logar:", error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
      set({ user: null });
    } catch (error: any) {
      console.error("Erro ao deslogar:", error.message);
      throw error;
    }
  },

  register: async (email, password, nome, telefone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: nome });
      set({
        user: {
          nome,
          telefone,
          email: userCredential.user.email || "",
        },
      });
    } catch (error: any) {
      console.error("Erro ao registrar:", error.message);
      throw error;
    }
  },
}));
