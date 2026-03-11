import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setBarcode(data);
    console.log('Code scanné:', data);
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
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "qr", "code128"]
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {barcode && (
        <View style={styles.result}>
          <Text>Code détecté :</Text>
          <Text>{barcode}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
