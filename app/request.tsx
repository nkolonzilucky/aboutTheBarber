import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { requestAppointment } from "@/lib/api/appointments";

export default function RequestScreen() {
  const { serviceId, serviceName } = useLocalSearchParams<{
    serviceId: string;
    serviceName: string;
  }>();

  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRequest() {
    if (!date || !time) {
      Alert.alert("Missing info", "Please select date and time");
      return;
    }

    try {
      setLoading(true);
      await requestAppointment(serviceId, date, time);
      Alert.alert("Requested", "Your appointment is pending approval");
      router.back();
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Could not request appointment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{serviceName}</Text>

      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <TextInput
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />

      <Button
        title={loading ? "Requesting…" : "Request Appointment"}
        onPress={handleRequest}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
