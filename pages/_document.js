import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head />
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
