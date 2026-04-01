import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

type SoundKey =
  | 'fantasy'
  | 'lofi'
  | 'rain'
  | 'piano'
  | 'wind'
  | 'bell'
  | 'gong';

const SOUND_MAP: Record<SoundKey, any> = {
  fantasy: require('../assets/sounds/fantasy.mp3'),
  lofi: require('../assets/sounds/lofi.mp3'),
  rain: require('../assets/sounds/rain.mp3'),
  piano: require('../assets/sounds/piano.mp3'),
  wind: require('../assets/sounds/wind.mp3'),
  bell: require('../assets/sounds/bell.mp3'),
  gong: require('../assets/sounds/gong.mp3'),
};

let backgroundPlayer: AudioPlayer | null = null;
let effectPlayer: AudioPlayer | null = null;

async function ensureAudioMode() {
  await setAudioModeAsync({
    playsInSilentMode: true,
  });
}

export async function playBackgroundSound(
  key: SoundKey,
  loop: boolean = true
) {
  await ensureAudioMode();
  stopBackgroundSound();

  const source = SOUND_MAP[key];
  if (!source) return;

  backgroundPlayer = createAudioPlayer(source);
  backgroundPlayer.loop = loop;
  backgroundPlayer.play();
}

export function stopBackgroundSound() {
  if (backgroundPlayer) {
    backgroundPlayer.pause();
    backgroundPlayer = null;
  }
}

export async function playEffectSound(key: SoundKey) {
  await ensureAudioMode();

  if (effectPlayer) {
    effectPlayer.pause();
    effectPlayer = null;
  }

  const source = SOUND_MAP[key];
  if (!source) return;

  effectPlayer = createAudioPlayer(source);
  effectPlayer.play();
}

export function stopEffectSound() {
  if (effectPlayer) {
    effectPlayer.pause();
    effectPlayer = null;
  }
}