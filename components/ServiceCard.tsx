import { Service } from "@/types/db";
import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";

type Props = {
  service: Service;
};

const ServiceCard = (props: Props) => {
  const { service } = props;
  const { id, name, duration_minutes, price } = service;

  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.buttonPressed,
      ]}
      onPress={() =>
        router.push({
          pathname: "/request",
          params: {
            serviceId: id,
            serviceName: name,
          },
        })
      }
    >
      <View style={styles.card}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.meta}>
          {duration_minutes} min · R{price}
        </Text>
      </View>
    </Pressable>
  );
};

export default ServiceCard;

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

  cardPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
