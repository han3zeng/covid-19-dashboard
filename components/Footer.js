import React from 'react'
import styles from './Footer.module.scss'
const { basePath } = require('../next.config.js')

const People = ({ data }) => {
  const Content = data.map((person, index) => {
    return (
      <div
        key={`member_${person.title}`}
      >
        {`${person.title}｜${person.name}`}
      </div>
    )
  })
  return (
    <div
      className={styles.peopleContainer}
    >
      {Content}
    </div>
  )
}

const Footer = () => {
  const peopleDate = [
    {
      title: '監製',
      name: '蘇啟禎'
    },
    {
      title: '製作人',
      name: '卓冠齊'
    },
    {
      title: '企劃',
      name: '董容慈、曾芯敏'
    },
    {
      title: '設計',
      name: '曾芯敏'
    },
    {
      title: '工程',
      name: '曾涵郁、陳柏偉'
    },
    {
      title: '社群編輯',
      name: 'Nagao Kunaw'
    }
  ]
  return (
    <div
      className={styles.container}
    >
      <People
        data={peopleDate}
      />
      <div className={styles.logos}>
        <a
          href="https://www.pts.org.tw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${basePath}/logo-1.svg`} alt="公共電視可點擊商標" />
        </a>
        <a
          href="https://news.pts.org.tw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${basePath}/logo-2.svg`} alt="公視新聞網可點擊商標" />
        </a>
        <a
          href="https://newslab.pts.org.tw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={`${basePath}/logo-3.svg`} alt="新聞實驗室可點擊商標" />
        </a>
      </div>
      <div className={styles.copyRight}>
        Public Television Service Foundation. All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer
