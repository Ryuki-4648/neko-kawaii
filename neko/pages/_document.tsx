import Document, { Html, Head, Main, NextScript } from 'next/document';
import styles from "./index.module.css"

class MyDocument extends Document {
  render() {
    return (
      <Html className={styles.html}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet" />
          <title>CATS</title>
        </Head>
        <body className={styles.body}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
