import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function ScannerScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleBarcodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return;
  
    setScanned(true);
  
    const cleaned = (data ?? '').replace(/\s+/g, '').trim();
    router.replace(`/scan-result?isbn=${encodeURIComponent(cleaned)}`);
  };
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Chargement…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Permission caméra requise</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'qr', 'code128'],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Scannez le code ISBN du livre</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  text: { color: '#fff', textAlign: 'center' },
  overlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 60,
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  overlayText: {
    textAlign: 'center',
    color: '#291425',
    fontFamily: 'GillSans-Bold',
    fontSize: 16,
  },
});