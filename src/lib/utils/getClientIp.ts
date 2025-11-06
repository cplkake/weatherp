import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export default async function getClientIp(headers: ReadonlyHeaders): Promise<string> {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return "8.8.8.8";
}