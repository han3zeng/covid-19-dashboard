import Document, { Html, Head, Main, NextScript } from 'next/document'
const { basePath } = require('../next.config.js')

function makeStructuredData() {
    return {
      "@context": "http://schema.org",
      "@type": "Article",
      "headline": "台灣Covid-19最新疫情動態｜數位專題 | P#新聞實驗室",
      "url": "https://news.pts.org.tw/project/covid-tw-2021",
      "thumbnailUrl": "等og圖片完成",
      "articleSection": "醫療",
      "creator": {
        "@type": "Person",
        "name": "P#新聞實驗室"
      },
      "keywords": [
        "新冠肺炎",
        "武漢肺炎",
        "疾管署",
        "衛福部",
        "校正回歸",
        "居家隔離",
        "集中檢疫",
        "社區感染",
        "萬華",
        "台北",
        "新北市",
        "國產疫苗",
        "確診",
        "快篩",
        "陽性率",
        "獅子會",
        "三級警戒",
        "COVID-19",
        "本土病例",
        "COVAX",

        "NewsArticle"
      ],
      "dateCreated": "2021-6-17T17:01:06+08:00",
      "dateModified": "2021-6-17T17:01:06+08:00",
      "datePublished": "2021-6-17T17:01:06+08:00",
      "mainEntityOfPage": "https://news.pts.org.tw/project/covid-tw-2021",
      "image": {
        "@type": "ImageObject",
        "url": "https://d3prffu8f9hpuw.cloudfront.net/covid-19-dashboard/og-image.jpg",
        "height": 648,
        "width": 1080
      },
      "author": [{
          "@type": "Person",
          "familyName": "卓",
          "givenName": "冠齊",
          "name": "卓冠齊"
        },
        {
          "@type": "Person",
          "familyName": "董",
          "givenName": "容慈",
          "name": "董容慈"
        },
        {
          "@type": "Person",
          "familyName": "Kunaw",
          "givenName": "Nagao",
          "name": "Nagao Kunaw"
        },
        {
          "@type": "Person",
          "familyName": "曾",
          "givenName": "芯敏",
          "name": "曾芯敏"
        },
        {
          "@type": "Person",
          "familyName": "曾",
          "givenName": "涵郁",
          "name": "曾涵郁"
        },
        {
          "@type": "Person",
          "familyName": "陳",
          "givenName": "柏偉",
          "name": "陳柏偉"
        }
      ],
      "publisher": {
        "@type": "Organization",
        "name": "P#新聞實驗室",
        "logo": {
          "@type": "ImageObject",
          "url": "https://avatars1.githubusercontent.com/t/3351266?s=280&v=4"
        }
      },
      "description": "全台三級警戒至今，公視新聞網不斷更新，台灣正式進入「社區感染」以來，每日縣市確診數，以及疫苗施打進度，並傳遞最新疫情消息與觀點。 "
    }
}

const gtmFunction = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W3W2ZR4');`

class MyDocument extends Document {
  render () {
    return (
      <Html lang="zh-Hant">
        <Head>
          <link rel="icon" href="https://newslab.pts.org.tw/static/images/icon/icon-favicon.png" />
          <meta name="title" content="台灣Covid-19最新疫情動態｜數位專題 | P#新聞實驗室"/>
          <meta name="description" content="全台三級警戒至今，公視新聞網不斷更新，台灣正式進入「社區感染」以來，每日縣市確診數，以及疫苗施打進度，並傳遞最新疫情消息與觀點。 標籤: 新冠肺炎,武漢肺炎,疾管署,衛福部,校正回歸,居家隔離,集中檢疫,社區感染,萬華,台北,新北市,國產疫苗,確診,快篩,陽性率,獅子會,三級警戒,COVID-19,本土病例,疫情,群體免疫,COVAX"/>
          <meta name="news_keywords" content="新冠肺炎,武漢肺炎,疾管署,衛福部,校正回歸,居家隔離,集中檢疫,社區感染,萬華,台北,新北市,國產疫苗,確診,快篩,陽性率,獅子會,三級警戒,COVID-19,本土病例,疫情,群體免疫,COVAX"/>
          <link rel="canonical" href="https://news.pts.org.tw/project/garbage-islaind-2020"/>
          <link rel="icon" href="https://newslab.pts.org.tw/static/images/icon/icon-favicon.png"/>
          <meta name="application-name" content="P#新聞實驗室"/>
          <meta name="copyright" content="公共電視"/>
          <meta property="og:type" content="website"/>
          <meta property="og:site_name" content="P#新聞實驗室"/>
          <meta property="og:title" content="台灣Covid-19最新疫情動態｜數位專題 | P#新聞實驗室"/>
          <meta property="og:url" content="https://news.pts.org.tw/project/covid-tw-2021"/>
          <meta property="og:description" content="全台三級警戒至今，公視新聞網不斷更新，台灣正式進入「社區感染」以來，每日縣市確診數，以及疫苗施打進度，並傳遞最新疫情消息與觀點。 標籤: 新冠肺炎,武漢肺炎,疾管署,衛福部,校正回歸,居家隔離,集中檢疫,社區感染,萬華,台北,新北市,國產疫苗,確診,快篩,陽性率,獅子會,三級警戒,COVID-19,本土病例,疫情,群體免疫,COVAX"/>
          <meta property="fb:app_id" content="206068353920887"/>
          <meta property="og:locale" content="zh_TW"/>
          <meta property="og:image" content="https://d3prffu8f9hpuw.cloudfront.net/covid-19-dashboard/og-image.jpg"/>
          <meta property="og:image:type" content="image/jpeg"/>
          <meta property="og:image:width" content="1200"/>
          <meta property="og:image:height" content="630"/>
          <meta name="twitter:title" content="台灣Covid-19最新疫情動態｜數位專題 | P#新聞實驗室"/>
          <meta name="twitter:url" content="https://news.pts.org.tw/project/covid-tw-2021"/>
          <meta name="twitter:image" content="等og圖片完成"/>
          <meta name="twitter:description" content="全台三級警戒至今，公視新聞網不斷更新，台灣正式進入「社區感染」以來，每日縣市確診數，以及疫苗施打進度，並傳遞最新疫情消息與觀點。"/>
          <meta property="article:author" content="https://www.facebook.com/pnnpts/"/>
          <meta property="article:publisher" content="https://www.facebook.com/pnnpts/"/>
          <meta property="article:section" content="醫療"/>
          <meta property="article:tag" content="新冠肺炎"/>
          <meta property="article:tag" content="武漢肺炎"/>
          <meta property="article:tag" content="疾管署"/>
          <meta property="article:tag" content="衛福部"/>
          <meta property="article:tag" content="校正回歸"/>
          <meta property="article:tag" content="居家隔離"/>
          <meta property="article:tag" content="集中檢疫"/>
          <meta property="article:tag" content="社區感染"/>
          <meta property="article:tag" content="萬華"/>
          <meta property="article:tag" content="台北"/>
          <meta property="article:tag" content="新北市"/>
          <meta property="article:tag" content="國產疫苗"/>
          <meta property="article:tag" content="確診"/>
          <meta property="article:tag" content="快篩"/>
          <meta property="article:tag" content="陽性率"/>
          <meta property="article:tag" content="獅子會"/>
          <meta property="article:tag" content="三級警戒"/>
          <meta property="article:tag" content="COVID-19"/>
          <meta property="article:tag" content="本土病例" />
          <meta property="article:tag" content="疫情" />
          <meta property="article:tag" content="群體免疫" />
          <meta property="article:tag" content="COVAX" />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W3W2ZR4"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}
          />
          <Main />
          <NextScript />
          <script src={`${basePath}/initialScript.js`}></script>
          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: gtmFunction }}></script>
          <script src="https://public.flourish.studio/resources/embed.js"></script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(makeStructuredData()) }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
