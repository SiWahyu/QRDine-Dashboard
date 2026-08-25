import { useMutation } from "@tanstack/react-query";
import { LoginFormValues } from "../schemas/loginSchema";
import { loginUser } from "../services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
  });
};
