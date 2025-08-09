import {
  StyleSheet,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

const App = () => {
  const webViewRef = useRef(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        const storageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return (
          cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
          storageGranted === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const injectedJS = `
    window.print = function() {
      window.ReactNativeWebView.postMessage("PRINT_TRIGGERED");
    };
    true;
  `;

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    if (message === 'PRINT_TRIGGERED') {
      Alert.alert('Print Triggered', 'Print button clicked in WebView.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://kps.esms.live/site/login' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJS}
        onMessage={handleMessage}
        setSupportMultipleWindows={true}
        onShouldStartLoadWithRequest={(request) => {
          const url = request.url.toLowerCase();
          const isDownload =
            url.includes('.pdf') ||
            url.includes('.doc') ||
            url.includes('.xls') ||
            url.includes('download');

          if (isDownload) {
            Linking.openURL(request.url);
            return false;
          }
          return true;
        }}
        onFileDownload={({ nativeEvent }) => {
          const { downloadUrl } = nativeEvent;
          Linking.openURL(downloadUrl);
        }}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});




// source={{ uri: 'https://esmsv2.scriptlab.in/site/login' }}
// source={{ uri: 'https://dsps.esms.live/site/login' }}
// source={{ uri: 'https://acp.esms.live/site/login' }}
// source={{ uri: 'https://bluebellschool.org.in/site/login' }}
// source={{ uri: 'https://smbb.in/site/login' }}
// source={{ uri: 'https://kps.esms.live/site/login' }}