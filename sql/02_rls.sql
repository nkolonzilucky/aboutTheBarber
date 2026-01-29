
-- ROW LEVEL SECURITY for the appointments table
alter table appointments enable row level security;

create policy "Users can create appointments"
on appointments
for insert
with check (
  auth.uid() = user_id
);

create policy "Users can view own appointments"
on appointments
for select
using (
  auth.uid() = user_id
);

create policy "Barber can view all appointments"
on appointments
for select
using (
  auth.uid() = '6793adb9-ffcc-4e0c-a79b-2909a06e5103'
);

create policy "Barber can update appointments"
on appointments
for update
using (
  auth.uid() = '6793adb9-ffcc-4e0c-a79b-2909a06e5103'
);


-- ROW LEVEL SECURITY for the availability table
alter table availability enable row level security;

create policy "Availability is readable by all"
on availability
for select
using (true);

create policy "Only authenticated users can manage availability"
on availability
for all
using (auth.role() = 'authenticated');
