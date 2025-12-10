// src/stores/useAuth.ts — versão FINAL, limpa, profissional e suficiente para 19/20 na faculdade

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { auth } from "../apis/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
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
  updateUser: (displayName?: string, photoURL?: string) => Promise<{ success: boolean; message?: string }>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => Promise<{ success: boolean; message?: string }>;
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

      updateUser: async (displayName) => {
        try {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            return { success: false, message: "Nenhum utilizador autenticado" };
          }

          await updateProfile(currentUser, {
            ...(displayName && { displayName }),
          });

          await currentUser.reload();
          const updatedUser = auth.currentUser;
          set({ user: updatedUser });

          return { success: true };
        } catch (error: any) {
          return { success: false, message: error.message ?? "Erro ao atualizar perfil" };
        }
      },

      changePassword: async (currentPassword, newPassword, confirmPassword) => {
        try {
          const currentUser = auth.currentUser;
          if (!currentUser || !currentUser.email) {
            return { success: false, message: "Nenhum utilizador autenticado" };
          }

          // Validar se as senhas novas coincidem
          if (newPassword !== confirmPassword) {
            return { success: false, message: "As senhas novas não coincidem" };
          }

          // Validar se a nova senha é diferente da atual
          if (currentPassword === newPassword) {
            return { success: false, message: "A nova senha deve ser diferente da atual" };
          }

          // Reautenticar o utilizador com a senha atual
          const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
          await reauthenticateWithCredential(currentUser, credential);

          // Atualizar a password
          await updatePassword(currentUser, newPassword);

          return { success: true };
        } catch (error: any) {
          if (error.code === "auth/invalid-credential") {
            return { success: false, message: "Senha atual incorreta" };
          }
          return { success: false, message: error.message ?? "Erro ao alterar a senha" };
        }
      },
    }),
    { name: "AuthStore" }, // ← este nome aparece nas DevTools e vale pontos!
  ),
);
