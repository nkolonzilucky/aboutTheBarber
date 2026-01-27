import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { getServices } from "@/lib/api/services";
import type { Service } from "@/types/db";
import ActivityIndicatorComponent from "@/components/ActivityIndicatorComponent";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesScreen() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

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
      renderItem={({ item }) => <ServiceCard service={item} />}
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
