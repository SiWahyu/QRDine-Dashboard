import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../services/auth.service";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
