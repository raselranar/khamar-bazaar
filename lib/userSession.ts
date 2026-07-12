import { authClient } from "@/lib/auth-client";
export const getUserSession = async () => {
  const { data: session } = await authClient.getSession();
  console.log(session);
};
