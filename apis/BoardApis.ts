import { apiCore } from "./apiCore";

export const getApi = async (token: string) => {
  return await apiCore("/boards", {}, "GET", token);
};