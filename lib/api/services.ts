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

export async function getServiceById(
  id: string | null,
): Promise<Service | null> {
  if (!id) return null;
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) throw error;
  return data ?? null;
}
