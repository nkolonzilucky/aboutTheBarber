import { supabase } from "../supabase";
import type { BarberProfile } from "@/types/db";

export async function getBarberProfile(): Promise<BarberProfile | null> {
  const { data, error } = await supabase
    .from("barber_profile")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching barber profile:", error);
    return null;
  }

  return data;
}
