import { jwtVerify, createRemoteJWKSet } from "jose";
export default async function validateToken(token: string) {
  try {
    const JWKS = createRemoteJWKSet(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/jwks`),
    );
    const { payload } = await jwtVerify(token, JWKS);
    console.log(payload);
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    return { message: "Unauthorized", status: 401 };
  }
}
