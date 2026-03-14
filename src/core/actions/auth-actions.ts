"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutServerAction() {
  (await cookies()).delete("token");

  redirect("/login");
}
