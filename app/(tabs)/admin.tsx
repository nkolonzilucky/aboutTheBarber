import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  getPendingAppointments,
  updateAppointmentStatus,
} from "@/lib/api/appointments";
import { isBarber } from "@/lib/api/admin";
import type { Appointment } from "@/types/db";

export default function AdminScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const ok = await isBarber();
    setAllowed(ok);

    if (ok) {
      loadAppointments();
    } else {
      setLoading(false);
    }
  }

  async function loadAppointments() {
    setLoading(true);
    const data = await getPendingAppointments();
    setAppointments(data);
    setLoading(false);
  }

  async function handleUpdate(id: string, status: "approved" | "rejected") {
    await updateAppointmentStatus(id, status);
    loadAppointments();
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!allowed) {
    return (
      <View style={styles.center}>
        <Text>Not authorized.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={appointments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.meta}>
            {item.date} · {item.time}
          </Text>

          <View style={styles.actions}>
            <Button
              title="Approve"
              onPress={() => handleUpdate(item.id, "approved")}
            />
            <Button
              title="Reject"
              onPress={() => handleUpdate(item.id, "rejected")}
            />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  meta: {
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
