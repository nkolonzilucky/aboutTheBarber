import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { getServices } from "@/lib/api/services";
import type { Service } from "@/types/db";
import ActivityIndicatorComponent from "@/components/ActivityIndicatorComponent";

export default function ServicesScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const router = useRouter();

  async function loadServices() {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  }

  if (loading) return <ActivityIndicatorComponent />;

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={services}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/request",
              params: {
                serviceId: item.id,
                serviceName: item.name,
              },
            })
          }
        >
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>
              {item.duration_minutes} min · R{item.price}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 6,
  },
  meta: {
    color: "#666",
  },
});
