import '../styles/globals.scss'
import Head from 'next/head'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> 台灣Covid-19最新疫情動態｜P#新聞實驗室</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
