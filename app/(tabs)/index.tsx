import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getBarberProfile } from "@/lib/api/barber";
import type { BarberProfile } from "@/types/db";
import ActivityIndicatorComponent from "@/components/ActivityIndicatorComponent";
import { registerForNotifications } from "@/lib/notifications";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<BarberProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    registerForNotifications().catch(() => {
      // silently fail — app still works
    });
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    const data = await getBarberProfile();
    setProfile(data);
    setLoading(false);
  }

  if (loading) {
    return <ActivityIndicatorComponent />;
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Barber profile not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 12,
    alignSelf: "center",
  },
  bio: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    textAlign: "center",
  },
});
