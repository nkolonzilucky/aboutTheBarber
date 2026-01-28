import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { requestAppointment } from "@/lib/api/appointments";
import ActivityIndicatorComponent from "@/components/ActivityIndicatorComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { validateAppointmentTime } from "@/lib/helpers";
import { notifyBarberNewAppointment } from "@/lib/notifications";

export default function RequestScreen() {
  const { serviceId, serviceName } = useLocalSearchParams<{
    serviceId: string;
    serviceName: string;
  }>();

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleRequest() {
    const appointmentTime = getAppointmentDateTime();

    if (!appointmentTime) {
      Alert.alert("Please select date and time");
      return;
    }

    try {
      setLoading(true);
      const validation = validateAppointmentTime(appointmentTime);
      if (!validation.valid) {
        Alert.alert("Invalid time", validation.reason);
        return;
      }
      await requestAppointment(serviceId, appointmentTime);
      Alert.alert("Requested", "Your appointment is pending approval");
      await notifyBarberNewAppointment(appointmentTime, serviceName);
      router.back();
    } catch (e) {
      if (String(e).includes("User not authenticated")) {
        router.push("/login");
      } else if (
        String(e).includes(
          "This time slot is already booked. Please choose another time.",
        )
      ) {
        alert(e);
      } else {
        console.log(e);
        Alert.alert("Error", "Could not request appointment");
      }
    } finally {
      setLoading(false);
    }
  }

  function getAppointmentDateTime() {
    if (!date || !time) return null;

    const combined = new Date(date);
    combined.setHours(time.getHours(), time.getMinutes(), 0, 0);

    return combined.toISOString();
  }

  if (loading) {
    return <ActivityIndicatorComponent />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{serviceName}</Text>

      <Pressable onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{date ? date.toDateString() : "Select date"}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
              setTime(null); // reset time if date changes
            }
          }}
        />
      )}

      {date && (
        <Pressable onPress={() => setShowTimePicker(true)} style={styles.input}>
          <Text>
            {time
              ? time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Select time"}
          </Text>
        </Pressable>
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time ?? new Date()}
          mode="time"
          display="default"
          minuteInterval={15}
          onChange={(_, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setTime(selectedTime);
            }
          }}
        />
      )}

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
    borderColor: "#1F2933",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
});
