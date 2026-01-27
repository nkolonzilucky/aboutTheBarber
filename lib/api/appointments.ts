import { supabase } from "../supabase";
import { getCurrentUser } from "./auth";
import type { AppointmentStatus, AppointmentWithService } from "@/types/db";

export async function getPendingAppointments(): Promise<
  AppointmentWithService[]
> {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      id,
      appointment_at,
      status,
      service_id,
      services (
        name
      )
    `,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return (data as AppointmentWithService[]) ?? [];
}


export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  return supabase.from("appointments").update({ status }).eq("id", id);
}


export async function getMyAppointments(): Promise<AppointmentWithService[]> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      id,
      appointment_at,
      status,
      service_id,
      services (
        name
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as AppointmentWithService[]) ?? [];
}

export async function getAllAppointments(): Promise<AppointmentWithService[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      id,
      appointment_at,
      status,
      service_id,
      services (
        name
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as AppointmentWithService[]) ?? [];
}


export async function requestAppointment(
  serviceId: string,
  appointment_at: string,
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("appointments").insert({
    user_id: user.id,
    service_id: serviceId,
    appointment_at,
    status: "pending",
  });

  if (error) {
    throw error;
  }
}
