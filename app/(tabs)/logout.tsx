import { View, Button } from 'react-native'
import React from 'react'
import { signOut } from '@/lib/api/auth'

const LogoutButton = () => {
  return (
    <View>
          <Button title='Logout' onPress={() => {
              try {
                  signOut()
              } catch (error) {
                alert(error)
              }
          }} />
    </View>
  )
}

export default LogoutButton