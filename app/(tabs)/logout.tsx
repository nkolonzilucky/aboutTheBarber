import { View, Button } from 'react-native'
import React, { useState } from "react";
import { signOut } from '@/lib/api/auth'
import ActivityIndicatorComponent from "@/components/ActivityIndicatorComponent";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  if (loading) return <ActivityIndicatorComponent />;
  return (
    <View>
          <Button title='Logout' onPress={() => {
        try {
          setLoading(true);
          signOut();
        } catch (error) {
          alert(error);
        } finally {
          setLoading(false);
        }
          }} />
    </View>
  )
}

export default LogoutButton