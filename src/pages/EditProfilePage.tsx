import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { toast } from "react-toastify";

const editProfileSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.email("Email válido é obrigatório"),
    currentPassword: z.string(),
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string("Confirmação de senha é obrigatória"),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    },
  );

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfilePage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const onSubmit = async (data: EditProfileFormData) => {
    setIsSubmitting(true);
    try {
      await toast.promise(
        (async () => {
          await delay(800);
          // Implementar lógica de atualização do perfil aqui
          console.log("Dados do perfil:", data);
          return { success: true };
        })(),
        {
          pending: "Atualizando perfil...",
          success: "Perfil atualizado com sucesso!",
          error: "Erro ao atualizar perfil",
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const PasswordToggleButton = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 bg-transparent p-1"
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
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-3xl font-bold mb-8">Editar Perfil</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full px-8">
          <label htmlFor="name">Nome</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>

            <label htmlFor="currentPassword">Senha Atual</label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPassword")}
                className="pr-10"
              />
              <PasswordToggleButton
                show={showCurrentPassword}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            </div>
            {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}

            <label htmlFor="newPassword" className="mt-4">
              Nova Senha
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                className="pr-10"
                placeholder="Deixe em branco para não alterar"
              />
              <PasswordToggleButton show={showNewPassword} onClick={() => setShowNewPassword(!showNewPassword)} />
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

            <label htmlFor="confirmPassword" className="mt-4">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="pr-10"
              />
              <PasswordToggleButton
                show={showConfirmPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="mt-5" disabled={isSubmitting}>
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
