create table barber_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  avatar_url text
);

// Seed data for the barber_profile TABLE
insert into barber_profile (name, bio)
values (
  'Eric',
  'Precision cuts. Clean fades. Book without the wait.'
);


create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price integer not null,
  duration_minutes integer not null
);

// Seed data for the services TABLE
insert into services (name, price, duration_minutes)
values
  ('Haircut', 150, 30),
  ('Beard Trim', 90, 15),
  ('Haircut + Beard', 200, 45);


CREATE TYPE appointment_status AS ENUM (
  'pending',
  'approved',
  'rejected'
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  service_id uuid references services(id),
  status appointment_status not null default 'pending'::appointment_status,
  appointment_at timestamptz NOT NULL,
  created_at timestamp default now()
);


create table availability (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_duration_min int not null check (slot_duration_min > 0),
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

// Seed data for the availability TABLE

insert into availability (day_of_week, start_time, end_time, slot_duration_min)
values
  (1, '09:00', '17:00', 30),
  (2, '09:00', '17:00', 30),
  (3, '09:00', '17:00', 30),
  (4, '09:00', '17:00', 30),
  (5, '09:00', '15:00', 30);

