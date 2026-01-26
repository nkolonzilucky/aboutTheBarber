import { supabase } from "../supabase";
import { getCurrentUser } from "./auth";
import type { Appointment } from "@/types/db";

export async function getMyAppointments(): Promise<Appointment[]> {
  const user = await getCurrentUser();

  if (!user) {
      throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  console.log("appointments are: ", data);

  return data ?? [];
}


export async function requestAppointment(
  serviceId: string,
  date: string,
  time: string,
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("appointments").insert({
    customer_id: user.id,
    service_id: serviceId,
    date,
    time,
    status: "pending",
  });

  if (error) {
    throw error;
  }
}
