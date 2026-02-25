import { apiCore } from "./apiCore";

export const registerUser = async (formData: FormData) => {
  const res = await apiCore("/auth/register", formData, "POST");
  return res; // just return — no redux inside
};

export const loginUser = async (email: string, password: string) => {
  const res = await apiCore("/auth/login", { email, password }, "POST");
  return res; // just return
};
