import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview'

const App = () => {

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to scan QR codes.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://smbb.in/site/login' }}
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
// source={{ uri: 'https://dsps.esms.live/site/login' }}
// source={{ uri: 'https://acp.esms.live/site/login' }}
// source={{ uri: 'https://bluebellschool.org.in/site/login' }}
// source={{ uri: 'https://smbb.in/site/login' }}