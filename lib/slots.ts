import { Availability } from "@/types/db";


export type TimeSlot = {
  start: string; // ISO
  end: string; // ISO
};

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}

export function generateSlotsForDate(
  dateISO: string,
  availability: Availability,
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const date = new Date(dateISO);
  const day = date.getDay();

  if (day !== availability.day_of_week) {
    return slots;
  }

  const [startH, startM] = availability.start_time.split(":").map(Number);
  const [endH, endM] = availability.end_time.split(":").map(Number);

  let cursor = new Date(date);
  cursor.setHours(startH, startM, 0, 0);

  const end = new Date(date);
  end.setHours(endH, endM, 0, 0);

  while (cursor < end) {
    const slotEnd = addMinutes(cursor, availability.slot_duration_min);

    if (slotEnd > end) break;

    slots.push({
      start: cursor.toISOString(),
      end: slotEnd.toISOString(),
    });

    cursor = slotEnd;
  }

  return slots;
}

export function generateSlotsForDay(
  dateISO: string,
  availabilityRows: Availability[],
): TimeSlot[] {
  return availabilityRows.flatMap((row) => generateSlotsForDate(dateISO, row));
}
