import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html

      >
        <Head>
          <link rel="icon" href="https://newslab.pts.org.tw/static/images/icon/icon-favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/initialScript.js"></script>
          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
          <script src="https://public.flourish.studio/resources/embed.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
