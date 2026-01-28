import { supabase } from '@/lib/supabase'
import { Availability } from '@/types/db'


export async function getAvailability() {
  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .order('day_of_week')

  if (error) throw error
  return data as Availability[]
}

export async function getSlotDurationMin(
  appointmentAtISO: string,
): Promise<number> {
  const { data, error } = await supabase.rpc("get_slot_duration_for_datetime", {
    appointment_at: appointmentAtISO,
  });

  if (error) throw error;

  return data;
}

export async function updateAvailability(
  id: string,
  payload: Partial<Omit<Availability, 'id'>>
) {
  const { error } = await supabase
    .from('availability')
    .update(payload)
    .eq('id', id)

  if (error) throw error
}

