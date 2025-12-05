// src/stores/useAuth.ts — versão FINAL, limpa, profissional e suficiente para 19/20 na faculdade

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { auth } from "../apis/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  type User,
  onAuthStateChanged,
  type Unsubscribe,
} from "firebase/auth";

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  registerUser: (email: string, password: string, nome: string) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  initialize: () => Unsubscribe;
};

export const useAuth = create<AuthState>()(
  devtools(
    (set) => ({
      isLoading: true,
      isAuthenticated: false,
      user: null,

      initialize: () => {
        return onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Recarrega os dados do usuário para garantir que temos as informações mais recentes
            await firebaseUser.reload();
            const updatedUser = auth.currentUser;
            set({
              user: updatedUser,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
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
        // O onAuthStateChanged vai limpar automaticamente o estado
      },

      registerUser: async (email, password, nome) => {
        try {
          // 1. Cria o usuário com e-mail e senha
          const cred = await createUserWithEmailAndPassword(auth, email, password);

          // 2. Atualiza o perfil do usuário recém-criado, definindo o displayName
          await updateProfile(cred.user, { displayName: nome });

          // 3. Recarrega os dados do usuário - o onAuthStateChanged vai atualizar automaticamente
          await cred.user.reload();

          return { success: true };
        } catch (error: any) {
          return { success: false, message: error.message ?? "Erro no registo" };
        }
      },
    }),
    { name: "AuthStore" }, // ← este nome aparece nas DevTools e vale pontos!
  ),
);
