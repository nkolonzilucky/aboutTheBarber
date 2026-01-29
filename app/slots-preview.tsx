import { Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { getAvailability } from "@/lib/api/availability";
import { excludeBookedSlots, generateSlotsForDay, TimeSlot } from "@/lib/slots";
import { getAppointmentsForDate } from "@/lib/api/appointments";

export default function SlotsPreview() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const availability = await getAvailability();

    const today = new Date().toISOString().slice(0, 10);
    const generated = generateSlotsForDay(today, availability);
    const appointments = await getAppointmentsForDate(today);

    const freeSlots = excludeBookedSlots(generated, appointments);

    setSlots(freeSlots);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {slots.map((slot, i) => (
        <Text key={i}>
          {new Date(slot.start).toLocaleTimeString()} —{" "}
          {new Date(slot.end).toLocaleTimeString()}
        </Text>
      ))}
    </ScrollView>
  );
}
