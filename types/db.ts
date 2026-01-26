import type { Database } from "./supabase";

export type BarberProfile =
  Database["public"]["Tables"]["barber_profile"]["Row"];

export type Service = Database["public"]["Tables"]["services"]["Row"];

export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];

export type AppointmentStatus =
  Database["public"]["Enums"]["appointment_status"];