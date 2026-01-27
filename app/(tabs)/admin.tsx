import { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {
  getPendingAppointments,
  updateAppointmentStatus,
} from "@/lib/api/appointments";
import { isBarber } from "@/lib/api/admin";
import type { AppointmentStatus, AppointmentWithService } from "@/types/db";
import { router, useFocusEffect } from "expo-router";
import AppointmentCard from "@/components/AppointmentCard";
import ActivityIndicatorComponent from "@/components/ActivityIndicatorComponent";

export default function AdminScreen() {
  const [appointments, setAppointments] = useState<AppointmentWithService[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      checkAccess();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  async function checkAccess() {
    const ok = await isBarber();
    setAllowed(ok);

    if (ok) {
      try {
        setLoading(true);
        loadAppointments();
      } catch (err) {
        if (String(err).includes("User not authenticated")) {
          router.push("/login");
        } else {
          alert(err);
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("Only an admin user can access this screen. Login as an admin.");
      router.push("/login");
    }
  }

  async function loadAppointments() {
    const data = await getPendingAppointments();
    setAppointments(data);
  }

  async function handleUpdate(id: string, status: AppointmentStatus) {
    try {
      setLoading(true);
      await updateAppointmentStatus(id, status);
      loadAppointments();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicatorComponent />;
  }

  if (!allowed) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No appointments yet ✂️</Text>
        <Text style={styles.emptyText}>
          Book your first appointment and it will appear here.
        </Text>
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
          isBarber={allowed}
          onUpdateStatus={handleUpdate}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
