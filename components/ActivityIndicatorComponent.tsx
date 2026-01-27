import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const ActivityIndicatorComponent = () => {
  return (
     
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    
  )
}

export default ActivityIndicatorComponent

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})