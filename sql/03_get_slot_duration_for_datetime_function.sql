
create or replace function get_slot_duration_for_datetime(
  appointment_at timestamptz
)
returns int
language sql
stable
as $$
  select slot_duration_min
  from availability
  where day_of_week = extract(dow from appointment_at)
    and appointment_at::time >= start_time
    and appointment_at::time < end_time
  limit 1;
$$;
