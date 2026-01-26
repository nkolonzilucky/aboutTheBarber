import { getCurrentUser } from "./auth";

const BARBER_EMAIL = "nkolonzilucky@gmail.com";

export async function isBarber() {
  const user = await getCurrentUser();
  return user?.email === BARBER_EMAIL;
}
