import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import { Asset } from 'expo-asset';
import { BOOK_FILE_MAP } from '../bookFiles';

export default function ClassicReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [bookUri, setBookUri] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBook() {
      try {
        const moduleRef = BOOK_FILE_MAP[id ?? ''];
        if (!moduleRef) return;

        const asset = Asset.fromModule(moduleRef);
        await asset.downloadAsync();

        if (mounted) {
          setBookUri(asset.localUri || asset.uri || null);
        }
      } catch (error) {
        console.error('Erreur chargement EPUB:', error);
      }
    }

    loadBook();

    return () => {
      mounted = false;
    };
  }, [id]);

  const html = useMemo(() => {
    if (!bookUri) return '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
          />
          <script src="https://unpkg.com/epubjs/dist/epub.min.js"></script>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: #f6efe7;
              overflow: hidden;
              font-family: Georgia, serif;
            }

            #viewer {
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <div id="viewer"></div>

          <script>
            const bookUrl = ${JSON.stringify(bookUri)};
            const book = ePub(bookUrl);

            const rendition = book.renderTo("viewer", {
              width: "100%",
              height: "100%",
              spread: "none",
              flow: "paginated"
            });

            rendition.themes.default({
              body: {
                background: "#f6efe7",
                color: "#2a1527",
                "font-size": "18px",
                "line-height": "1.7",
                padding: "16px"
              }
            });

            rendition.display();
          </script>
        </body>
      </html>
    `;
  }, [bookUri]);

  if (!bookUri) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#BD61A6" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled
        allowFileAccess
        allowingReadAccessToURL={bookUri}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6EFE7',
  },
  loaderWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    backgroundColor: '#F6EFE7',
  },
});