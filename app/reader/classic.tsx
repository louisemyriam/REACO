import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import { Ionicons } from '@expo/vector-icons';
import { BOOK_FILE_MAP } from '../bookFiles';

export default function ClassicReaderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [bookBase64, setBookBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBook() {
      try {
        setError(null);

        const moduleRef = BOOK_FILE_MAP[id ?? ''];
        if (!moduleRef) {
          throw new Error(`Aucun EPUB trouvé pour l'id ${id}`);
        }

        const asset = Asset.fromModule(moduleRef);
        await asset.downloadAsync();

        const localUri = asset.localUri || asset.uri;
        if (!localUri) {
          throw new Error('Impossible de récupérer le fichier EPUB local.');
        }

        const base64 = await FileSystem.readAsStringAsync(localUri, {
          encoding: 'base64',
        });

        if (mounted) {
          setBookBase64(base64);
        }
      } catch (e: any) {
        if (mounted) {
          setError(e?.message ?? 'Erreur inconnue lors du chargement du livre.');
        }
      }
    }

    loadBook();

    return () => {
      mounted = false;
    };
  }, [id]);

  const html = useMemo(() => {
    if (!bookBase64) return '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
          <script src="https://unpkg.com/epubjs/dist/epub.min.js"></script>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              background: #F6EFE7;
            }

            #app {
              position: relative;
              width: 100%;
              height: 100%;
            }

            #viewer {
              width: 100%;
              height: 100%;
            }

            #loading {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #F6EFE7;
              color: #291425;
              font-family: Arial, sans-serif;
              z-index: 20;
            }

            .nav-zone {
              position: absolute;
              top: 0;
              bottom: 0;
              width: 22%;
              z-index: 15;
            }

            #prev-zone {
              left: 0;
            }

            #next-zone {
              right: 0;
            }

            #page-indicator {
              position: absolute;
              bottom: 18px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(41, 20, 37, 0.72);
              color: white;
              padding: 8px 14px;
              border-radius: 999px;
              font-family: Arial, sans-serif;
              font-size: 12px;
              z-index: 25;
            }
          </style>
        </head>
        <body>
          <div id="app">
            <div id="loading">Chargement du livre...</div>
            <div id="viewer"></div>
            <div id="prev-zone" class="nav-zone"></div>
            <div id="next-zone" class="nav-zone"></div>
            <div id="page-indicator">Page ...</div>
          </div>

          <script>
            function base64ToArrayBuffer(base64) {
              const binaryString = atob(base64);
              const len = binaryString.length;
              const bytes = new Uint8Array(len);
              for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              return bytes.buffer;
            }

            async function startReader() {
              try {
                if (!window.JSZip) {
                  throw new Error("JSZip lib not loaded");
                }

                const base64 = ${JSON.stringify(bookBase64)};
                const arrayBuffer = base64ToArrayBuffer(base64);

                const book = ePub(arrayBuffer);

                const rendition = book.renderTo("viewer", {
                  width: "100%",
                  height: "100%",
                  spread: "none",
                  flow: "paginated"
                });

                rendition.themes.default({
                  body: {
                    background: "#F6EFE7",
                    color: "#291425",
                    "font-size": "18px",
                    "line-height": "1.7",
                    padding: "18px"
                  }
                });

                await rendition.display();

                const loading = document.getElementById("loading");
                if (loading) loading.style.display = "none";

                const prevZone = document.getElementById("prev-zone");
                const nextZone = document.getElementById("next-zone");
                const pageIndicator = document.getElementById("page-indicator");

                prevZone.addEventListener("click", () => {
                  rendition.prev();
                });

                nextZone.addEventListener("click", () => {
                  rendition.next();
                });

                rendition.on("relocated", (location) => {
                  const current = location && location.start ? location.start.displayed.page : "?";
                  const total = location && location.start ? location.start.displayed.total : "?";
                  if (pageIndicator) {
                    pageIndicator.textContent = "Page " + current + " / " + total;
                  }
                });

                let touchStartX = 0;
                let touchEndX = 0;

                document.addEventListener("touchstart", (e) => {
                  touchStartX = e.changedTouches[0].screenX;
                });

                document.addEventListener("touchend", (e) => {
                  touchEndX = e.changedTouches[0].screenX;
                  const delta = touchEndX - touchStartX;

                  if (Math.abs(delta) > 50) {
                    if (delta < 0) {
                      rendition.next();
                    } else {
                      rendition.prev();
                    }
                  }
                });

                window.ReactNativeWebView?.postMessage(
                  JSON.stringify({ type: "ready" })
                );
              } catch (err) {
                window.ReactNativeWebView?.postMessage(
                  JSON.stringify({
                    type: "error",
                    message: err?.message || String(err)
                  })
                );
              }
            }

            startReader();
          </script>
        </body>
      </html>
    `;
  }, [bookBase64]);

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
        <Pressable
  style={styles.iconBtn}
  onPress={() =>
    router.push({
      pathname: '/book/[id]',
      params: {
        id,
        title:
          id === '1'
            ? 'Roméo et Juliette'
            : id === '2'
            ? 'Dracula'
            : undefined,
        coverUrl:
          id === '1'
            ? 'https://images.epagine.fr/094/9782264081094_1_75.jpg'
            : id === '2'
            ? 'https://products-images.di-static.com/image/bram-stoker-dracula/9781435129733-475x500-1.jpg'
            : undefined,
        description:
          id === '1'
            ? "L’histoire tragique de deux amants issus de familles ennemies, dont l’amour impossible est devenu l’un des plus grands classiques de la littérature."
            : id === '2'
            ? "Un roman gothique emblématique où mystère, tension et horreur se mêlent autour de l’inquiétant comte Dracula."
            : undefined,
        isPurchased: 'true',
      },
    })
  }
>
  <Ionicons name="chevron-back" size={24} color="#291425" />
</Pressable>

          <View style={styles.topBarRight}>
            <Pressable
              style={styles.iconBtn}
              onPress={() =>
                router.push({
                  pathname: '/pomodoro',
                  params: { id },
                })
              }
            >
              <Ionicons name="time-outline" size={22} color="#291425" />
            </Pressable>

            <Pressable
              style={styles.iconBtn}
              onPress={() =>
                router.push({
                  pathname: '/parametres-affichage',
                  params: { id, mode: 'classic' },
                })
              }
            >
              <Ionicons name="settings-outline" size={22} color="#291425" />
            </Pressable>
          </View>
        </View>

        <View style={styles.center}>
          <Text style={styles.errorTitle}>Impossible d’ouvrir le livre</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!bookBase64) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.iconBtn}
            onPress={() =>
              router.push({
                pathname: '/book/[id]',
                params: { id },
              })
            }
          >
            <Ionicons name="chevron-back" size={24} color="#291425" />
          </Pressable>

          <View style={styles.topBarRight}>
            <Pressable
              style={styles.iconBtn}
              onPress={() =>
                router.push({
                  pathname: '/pomodoro',
                  params: { id },
                })
              }
            >
              <Ionicons name="time-outline" size={22} color="#291425" />
            </Pressable>

            <Pressable
              style={styles.iconBtn}
              onPress={() =>
                router.push({
                  pathname: '/parametres-affichage',
                  params: { id, mode: 'classic' },
                })
              }
            >
              <Ionicons name="settings-outline" size={22} color="#291425" />
            </Pressable>
          </View>
        </View>

        <View style={styles.center}>
          <ActivityIndicator size="large" color="#BD61A6" />
          <Text style={styles.loadingText}>Chargement du livre…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Pressable
          style={styles.iconBtn}
          onPress={() =>
            router.push({
              pathname: '/book/[id]',
              //pathname: '/(tabs)/bibliotheque', if the other thing doesn't work keep this 
              params: { id },
            })
          }
        >
          <Ionicons name="chevron-back" size={24} color="#291425" />
        </Pressable>

        <View style={styles.topBarRight}>
          <Pressable
            style={styles.iconBtn}
            onPress={() =>
              router.push({
                pathname: '/pomodoro',
                params: { id, mode: 'classic' },
              })
            }
          >
            <Ionicons name="time-outline" size={22} color="#291425" />
          </Pressable>

          <Pressable
            style={styles.iconBtn}
            onPress={() =>
              router.push({
                pathname: '/parametres-affichage',
                params: { id, mode: 'classic' },
              })
            }
          >
            <Ionicons name="settings-outline" size={22} color="#291425" />
          </Pressable>
        </View>
      </View>

      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowUniversalAccessFromFileURLs
        allowingReadAccessToURL={'file://'}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'error') {
              setError(data.message || 'Erreur EPUB dans le WebView.');
            }
          } catch {
            // ignore
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6EFE7',
  },
  topBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6EFE7',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#291425',
    fontSize: 16,
  },
  errorTitle: {
    color: '#291425',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    color: '#291425',
    fontSize: 15,
    textAlign: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: '#F6EFE7',
  },
});