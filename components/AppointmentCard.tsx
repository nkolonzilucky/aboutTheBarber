import { Appointment, AppointmentStatus } from "@/types/db";
import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

type Props = {
  appointment: Appointment;
  isBarber: boolean;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
};

const AppointmentCard = (props: Props) => {
  const { appointment, isBarber, onUpdateStatus } = props;
  const { id, status } = appointment;

  return (
    <View>
      {isBarber && status === "pending" && (
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
      )}
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
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
