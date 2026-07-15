"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

export async function getUserTokenClient() {
  const { token } = await auth.api.getToken({ headers: await headers() });
  return token || null;
}
