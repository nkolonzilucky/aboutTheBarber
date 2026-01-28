import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForNotifications() {
  const { status } = await Notifications.getPermissionsAsync();

  if (status !== "granted") {
    const request = await Notifications.requestPermissionsAsync();
    if (request.status !== "granted") {
      throw new Error("Notification permission not granted");
    }
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    } as Notifications.NotificationBehavior),
  });

}

export async function scheduleAppointmentReminder(appointmentAtISO: string) {
  const appointmentDate = new Date(appointmentAtISO);

  // 24 hours before
  const triggerDate = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);

  if (triggerDate.getTime() <= Date.now()) {
    return; // too soon, don't schedule
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Appointment Reminder",
      body: `You have an appointment tomorrow at ${appointmentDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      )}`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate
    },
  });
}

export async function notifyBarberNewAppointment(
  appointmentTimeISO: string,
  serviceName?: string,
) {
  const appointmentDate = new Date(appointmentTimeISO);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Appointment",
      body: serviceName
        ? `${serviceName} booked for ${appointmentDate.toLocaleString()}`
        : `New appointment booked for ${appointmentDate.toLocaleString()}`,
    },
    trigger: null, // fire immediately
  });
}
