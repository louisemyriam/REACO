import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

export default function OuvertureScreen() {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FEF6EF', '#FEC271']}
      style={styles.container}
    >
      {!videoReady && (
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.placeholder}
          contentFit="contain"
        />
      )}

      <Video
        source={require('../assets/videos/OuvertureVideo.mp4')}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
        onReadyForDisplay={() => setVideoReady(true)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  
});