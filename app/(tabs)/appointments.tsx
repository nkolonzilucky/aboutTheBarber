import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getMyAppointments } from "@/lib/api/appointments";
import type { AppointmentWithService } from "@/types/db";
import { router, useFocusEffect } from "expo-router";
import { StatusBadge } from "@/components/StatusBadge";

export default function MyAppointmentsScreen() {
  const [appointments, setAppointments] = useState<AppointmentWithService[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, []),
  );

  async function loadAppointments() {
    setLoading(true);
    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (err) {
      if (String(err).includes("User not authenticated")) {
        router.push("/login");
      } else {
        alert(err);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No appointments yet.</Text>
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
          <Text style={styles.title}>{item.services?.name}</Text>

          <Text style={styles.meta}>
            {item.date} • {item.time}
          </Text>

          <StatusBadge status={item.status} />
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
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  title: {
    color: "#E5E7EB",
    fontSize: 16,
    fontWeight: "600",
  },

  meta: {
    marginVertical: 6,
    color: "#9CA3AF",
  },
});
