import { supabase } from "../supabase";
import type { Service } from "@/types/db";

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("price", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data ?? [];
}


