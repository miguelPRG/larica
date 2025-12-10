import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "../hooks/useUserStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

const editProfileSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string("Email inválido"),
});

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual é obrigatória"),
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a nova senha"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type EditProfileFormData = z.infer<typeof editProfileSchema>;
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function EditProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const { user, updateUser, changePassword } = useAuth(
    useShallow((state) => ({
      user: state.user,
      updateUser: state.updateUser,
      changePassword: state.changePassword,
    }))
  );
  const navigate = useNavigate();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onSubmitProfile = async (data: EditProfileFormData) => {
    setIsSubmittingProfile(true);
    try {
      await toast.promise(
        (async () => {
          await delay(800);

          if (data.name !== user?.displayName) {
            const updateResult = await updateUser(data.name);
            if (!updateResult.success) {
              throw new Error(updateResult.message || "Erro ao atualizar perfil");
            }
          }

          return { success: true };
        })(),
        {
          pending: "Atualizando perfil...",
          success: "Perfil atualizado com sucesso!",
          error: {
            render({ data }) {
              return `Erro: ${(data as Error).message}`;
            },
          },
        },
      );

      navigate("/");

    } catch (error) {
      console.error("Erro na atualização:", error);
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const onSubmitPassword = async (data: ChangePasswordFormData) => {
    setIsSubmittingPassword(true);
    try {
      await toast.promise(
        (async () => {
          await delay(800);

          const passwordResult = await changePassword(
            data.currentPassword,
            data.newPassword,
            data.confirmPassword,
          );
          if (!passwordResult.success) {
            throw new Error(passwordResult.message || "Erro ao alterar a senha");
          }

          return { success: true };
        })(),
        {
          pending: "Alterando senha...",
          success: "Senha alterada com sucesso!",
          error: {
            render({ data }) {
              return `Erro: ${(data as Error).message}`;
            },
          },
        },
      );

      resetPassword();
      navigate("/");
    } catch (error) {
      console.error("Erro na alteração de senha:", error);
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const PasswordToggleButton = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 bg-transparent p-1 my-0"
    >
      {show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col items-center mt-20">
        <div className="w-60 mb-10">
          <img src={logo} alt="Logo" className="cursor-pointer" onClick={() => navigate("/")} />
        </div>
        <h1 className="text-center mb-10">Editar Perfil</h1>

        <div className="w-full max-w-lg">
          {/* Formulário de Perfil */}
          <form noValidate onSubmit={handleSubmitProfile(onSubmitProfile)}>
            <h2 className="text-lg font-semibold mb-2">Dados Pessoais</h2>

            <div>
              <label htmlFor="name" className="block mb-2">
                Nome
              </label>
              <input id="name" type="text" {...registerProfile("name")} />
              {errorsProfile.name && <p className="text-red-500 text-sm mt-1">{errorsProfile.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input id="email" type="email" {...registerProfile("email")} disabled />
              {errorsProfile.email && <p className="text-red-500 text-sm mt-1">{errorsProfile.email.message}</p>}
            </div>

            <button type="submit" disabled={isSubmittingProfile} className="mt-4">
              {isSubmittingProfile ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>

          {/* Formulário de Senha */}
          <form noValidate onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <h2 className="text-lg font-semibold mb-2">Alterar Senha</h2>

            <div>
              <label htmlFor="currentPassword" className="block mb-2">
                Senha Atual
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  {...registerPassword("currentPassword")}
                  className="pr-10 w-full"
                />
                <PasswordToggleButton
                  show={showCurrentPassword}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              </div>
              {errorsPassword.currentPassword && (
                <p className="text-red-500 text-sm mt-1">{errorsPassword.currentPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block mb-2">
                Nova Senha
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...registerPassword("newPassword")}
                  className="pr-10 w-full"
                />
                <PasswordToggleButton show={showNewPassword} onClick={() => setShowNewPassword(!showNewPassword)} />
              </div>
              {errorsPassword.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errorsPassword.newPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirmar Nova Senha
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...registerPassword("confirmPassword")}
                  className="pr-10 w-full"
                />
                <PasswordToggleButton
                  show={showConfirmPassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>
              {errorsPassword.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errorsPassword.confirmPassword.message}</p>
              )}
            </div>

            <button type="submit" disabled={isSubmittingPassword} className="mt-4">
              {isSubmittingPassword ? "Alterando..." : "Alterar Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
