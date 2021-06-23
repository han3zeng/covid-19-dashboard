import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Navigation from '../components/Navigation'
import Landing from '../components/Landing'
import Content from '../components/Content'
import ReadMore from '../components/ReadMore'
import Footer from '../components/Footer'

const DEFAULT_DATA_OBJ = {
  landing: {
    h1: '',
    timestamp_updatedAt: '',
    timestamp_releasedAt: '',
    stats_confirmedDomesticToday: '',
    stats_confirmedTotal: '',
    stats_deathTotal: '',
    stats_quarantineEndCount: '',
    stats_vaccinatedRate: ''
  },
  content: [],
  read_more: []
}

export default function Home ({ spreadsheet }) {
  return (
    <div>
      <div className={styles.container}>
        <Navigation />
        <Landing
          data={spreadsheet.landing}
        />
        <Content
          data={spreadsheet.content}
        />
        <ReadMore
          data={spreadsheet.read_more}
        />
      </div>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps (context) {
  const response = await fetch(`http://127.0.0.1:${process.env.PORT}/fetch-data`)
  let spreadsheet = {}
  if (response.ok) {
    spreadsheet = await response.json()
  } else {
    return {
      redirect: {
        destination: 'https://news.pts.org.tw/projects',
        permanent: false
      }
    }
  }
  return {
    props: {
      spreadsheet: spreadsheet || DEFAULT_DATA_OBJ
    }
  }
}
