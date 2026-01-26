import {
  Appointment,
  AppointmentStatus,
  AppointmentWithService,
} from "@/types/db";
import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { STATUS_COLORS } from "@/constants/status_styles";

type Props = {
  appointment: AppointmentWithService;
  isBarber: boolean;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
};

const AppointmentCard = (props: Props) => {
  const { appointment, isBarber, onUpdateStatus } = props;
  const { id, status } = appointment;

  return (
    <View>
      {isBarber && status === "pending" && (
        <View style={styles.card}>
          <Text style={styles.title}>{appointment.services?.name}</Text>
          <Text style={styles.meta}>
            📅 {appointment.date} • {appointment.time}
          </Text>
          <View style={styles.statusRow}>
            <View
              style={[styles.dot, { backgroundColor: STATUS_COLORS[status] }]}
            />
            <Text
              style={{
                backgroundColor: STATUS_COLORS[status],
                paddingHorizontal: 10,
                borderRadius: 16,
              }}
            >
              Pending
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.approve]}
              onPress={() => onUpdateStatus(id, "approved")}
            >
              <Text style={styles.buttonText}>Approve</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.reject]}
              onPress={() => onUpdateStatus(id, "rejected")}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5E7EB",
  },

  meta: {
    marginTop: 6,
    color: "#94A3B8",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },

  actions: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
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
  },
});
