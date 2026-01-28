export function validateAppointmentTime(
  isoString: string,
): { valid: true } | { valid: false; reason: string } {
  const now = new Date();
  const selected = new Date(isoString);

  if (selected.getTime() < now.getTime()) {
    return { valid: false, reason: "Appointment cannot be in the past" };
  }

  const diffMinutes = (selected.getTime() - now.getTime()) / (1000 * 60);

  if (diffMinutes < 15) {
    return {
      valid: false,
      reason: "Appointment must be at least 15 minutes from now",
    };
  }

  const diffDays = (selected.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays > 90) {
    return {
      valid: false,
      reason: "Appointments can only be booked 90 days in advance",
    };
  }

  return { valid: true };
}


