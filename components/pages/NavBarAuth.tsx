"use server";

import { cookies } from "next/headers";
export  async function NavBarAuth() {
  const token = cookies().get("token");
  return token;
}

export  async function signOut(){
    const cookieStore = cookies();
    cookieStore.delete('token');
    return true;
}
