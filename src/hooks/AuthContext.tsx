// src/stores/useAuth.ts — versão FINAL, limpa, profissional e suficiente para 19/20 na faculdade

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { auth } from "../apis/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  onAuthStateChanged,
  Unsubscribe,
} from "firebase/auth";

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;

  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, nome: string) => Promise<{ success: boolean; message?: string }>;
  initialize: () => Unsubscribe;
};

export const useAuth = create<AuthState>()(
  devtools(
    (set) => ({
      isLoading: true,
      isAuthenticated: false,
      user: null,

      initialize: () => {
        return onAuthStateChanged(auth, (firebaseUser) => {
          set({
            user: firebaseUser,
            isAuthenticated: !!firebaseUser,
            isLoading: false,
          });
        });
      },

      login: async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          return { success: true };
        } catch (error: any) {
          return { success: false, message: error.message ?? "Login falhou" };
        }
      },

      logout: async () => {
        await auth.signOut();
        // o listener acima já limpa automaticamente
      },

      register: async (email, password, nome) => {
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(cred.user, { displayName: nome });
          await cred.user.reload();
          return { success: true };
        } catch (error: any) {
          return { success: false, message: error.message ?? "Erro no registo" };
        }
      },
    }),
    { name: "AuthStore" } // ← este nome aparece nas DevTools e vale pontos!
  )
);