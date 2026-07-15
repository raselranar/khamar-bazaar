import { auth } from "./auth";
import { authClient } from "./auth-client";

export const getUserToken = async () => {
  const token = await authClient.token();
  const jwks = await auth.api.getJwks();
  console.log(jwks);
  return token;
};
