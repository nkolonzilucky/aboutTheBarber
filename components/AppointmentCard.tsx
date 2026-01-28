import { AppointmentStatus, AppointmentWithService } from "@/types/db";
import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { StatusBadge } from "./StatusBadge";

type Props = {
  appointment: AppointmentWithService;
  isBarber: boolean;
  onUpdateStatus: (
    id: string,
    status: AppointmentStatus,
    appointmentAt: string,
  ) => void;
};

const AppointmentCard = (props: Props) => {
  const { appointment, isBarber, onUpdateStatus } = props;
  const { id, status, appointment_at } = appointment;
  const appointmentDate = new Date(appointment_at);
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{appointment.services?.name}</Text>
      <Text style={styles.meta}>
        📅 {appointmentDate.toLocaleDateString()} •{" "}
        {appointmentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      <View style={{ marginTop: 10 }}>
        <StatusBadge status={appointment.status} />
      </View>
      {isBarber && status === "pending" && (
        <>
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.approve,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                onUpdateStatus(id, "approved", appointment.appointment_at)
              }
            >
              <Text style={styles.buttonText}>Approve</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.reject,
                pressed && styles.buttonPressed,
              ]}
              onPress={() =>
                onUpdateStatus(id, "rejected", appointment.appointment_at)
              }
            >
              <Text style={styles.buttonText}>Reject</Text>
            </Pressable>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#F9FAFB",
  },

  meta: {
    marginTop: 4,
    fontSize: 13,
    color: "#9CA3AF",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  actions: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  approve: {
    backgroundColor: "#10B981",
  },

  reject: {
    backgroundColor: "#EF4444",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
