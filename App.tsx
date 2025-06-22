import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://dsps.esms.live/site/login' }}
        style={styles.webview}
      />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
})



// source={{ uri: 'https://esmsv2.scriptlab.in/site/login' }}