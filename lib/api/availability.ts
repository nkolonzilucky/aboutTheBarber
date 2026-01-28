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

