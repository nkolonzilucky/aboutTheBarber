import { AppointmentStatus } from "@/types/db";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  status: AppointmentStatus;
};

export function StatusBadge({ status }: Props) {
  return (
    <View style={[styles.badge, styles[status]]}>
      <Text style={styles.text}>{status.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  pending: {
    backgroundColor: "#F59E0B", // amber
  },

  approved: {
    backgroundColor: "#10B981", // green
  },

  rejected: {
    backgroundColor: "#EF4444", // red
  },
});
