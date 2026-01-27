import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus,
} from "@/lib/api/appointments";
import type { AppointmentStatus, AppointmentWithService } from "@/types/db";
import { router, useFocusEffect } from "expo-router";
import { StatusBadge } from "@/components/StatusBadge";
import AppointmentCard from "@/components/AppointmentCard";
import { isBarber } from "@/lib/api/admin";
import ActivityIndicatorComponent from "@/components/ActivityIndicatorComponent";

export default function MyAppointmentsScreen() {
  const [appointments, setAppointments] = useState<AppointmentWithService[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [allow, setAllow] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  async function loadAppointments() {
    setLoading(true);
    const ok = await isBarber();
    setAllow(ok);
    try {
      if (ok) {
        const data = await getAllAppointments();
        setAppointments(data);
      } else {
        const data = await getMyAppointments();
        setAppointments(data);
      }
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

   async function handleUpdate(id: string, status: AppointmentStatus) {
     await updateAppointmentStatus(id, status);
     loadAppointments();
   }

  if (loading) {
    return <ActivityIndicatorComponent />;
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
        <AppointmentCard
          appointment={item}
          isBarber={allow}
          onUpdateStatus={handleUpdate}
        />
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
