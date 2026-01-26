import { getSession } from '@/lib/api/auth';
import { router } from 'expo-router';

const Index = async () => {
  const session = await getSession();

  if (!session) {
    router.replace("/login");
} else {
      router.replace("/(tabs)");
  }

}

export default Index