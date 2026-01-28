import { AppointmentWithService, Availability } from "@/types/db";
import { getSlotDurationMin } from "./api/availability";

export function excludeBookedSlots(
  slots: TimeSlot[],
  appointments: AppointmentWithService[],
): TimeSlot[] {
  return slots.filter((slot) => {
    const slotStart = new Date(slot.start).getTime();
    const slotEnd = new Date(slot.end).getTime();

    const overlapping = appointments.some((appt) => {
      if (appt.status !== "approved") return false;

      const apptStart = new Date(appt.appointment_at).getTime();
      let apptEnd = -1;
      getSlotDurationMin(appt.appointment_at)
        .then((slot_duration_min) => {
          apptEnd = addMinutes(
            new Date(appt.appointment_at),
            slot_duration_min,
          ).getTime();
        })
        .catch(() => alert("Error while calculating appointment end time."));

      return slotStart < apptEnd && slotEnd > apptStart;
    });

    return !overlapping;
  });
}

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
