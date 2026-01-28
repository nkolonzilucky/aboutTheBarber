import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  getAvailability,
  updateAvailability,
} from "@/lib/api/availability";
import { Availability } from "@/types/db";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AvailabilityScreen() {
  const [rows, setRows] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getAvailability();
      setRows(data);
    } finally {
      setLoading(false);
    }
  }

  async function save(row: Availability) {
    await updateAvailability(row.id, {
      start_time: row.start_time,
      end_time: row.end_time,
      slot_duration_min: row.slot_duration_min,
    });
  }

  if (loading) {
    return <Text>Loading availability…</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {rows.map((row, index) => (
        <View
          key={row.id}
          style={{
            marginBottom: 16,
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 8 }}>
            {DAYS[row.day_of_week]}
          </Text>

          <Text>Start time (HH:MM)</Text>
          <TextInput
            value={row.start_time.slice(0, 5)}
            onChangeText={(text) => {
              const updated = [...rows];
              updated[index].start_time = text;
              setRows(updated);
            }}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />

          <Text>End time (HH:MM)</Text>
          <TextInput
            value={row.end_time.slice(0, 5)}
            onChangeText={(text) => {
              const updated = [...rows];
              updated[index].end_time = text;
              setRows(updated);
            }}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />

          <Text>Slot duration (minutes)</Text>
          <TextInput
            keyboardType="numeric"
            value={String(row.slot_duration_min)}
            onChangeText={(text) => {
              const updated = [...rows];
              updated[index].slot_duration_min = Number(text);
              setRows(updated);
            }}
            style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
          />

          <Button title="Save" onPress={() => save(row)} />
        </View>
      ))}
    </ScrollView>
  );
}
