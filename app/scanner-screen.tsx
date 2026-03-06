import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function ScannerScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleBarcodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return; // sécurité anti double-scan
    setScanned(true);
    setBarcode(data);
    console.log('Code scanné:', data);

    // IMPORTANT: push en string => super fiable
    router.push(`/scan-result?isbn=${encodeURIComponent(data)}`);
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>Permission caméra requise</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'qr', 'code128'] }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      {barcode && (
        <View style={styles.result}>
          <Text>Code détecté :</Text>
          <Text>{barcode}</Text>

          <Text style={{ marginTop: 10 }} onPress={() => { setScanned(false); setBarcode(null); }}>
            Scanner à nouveau
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  result: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});