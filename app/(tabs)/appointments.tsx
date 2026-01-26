import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getMyAppointments } from "@/lib/api/appointments";
import type { Appointment } from "@/types/db";
import { router, useFocusEffect } from "expo-router";

export default function MyAppointmentsScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   loadAppointments();
  //   console.log("appointment loaded");
  // }, []);

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
    } catch {
      router.push("/login");
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
          <Text style={styles.status}>{item.status.toUpperCase()}</Text>
          <Text style={styles.meta}>
            {item.date} · {item.time}
          </Text>
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
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  status: {
    fontWeight: "600",
    marginBottom: 6,
  },
  meta: {
    color: "#666",
  },
});
