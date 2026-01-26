import { router } from "expo-router";
import { supabase } from "../supabase";

export async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw error;
  } else {
    alert(
      "Account created successfully. Supabase has sent the confirmation link to the provided email address. Login is allowed after email confirmation.",
    );
  }
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  } else {
    router.replace("/(tabs)");
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  router.replace("/login");
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
