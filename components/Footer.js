import React from 'react'
import styles from './Footer.module.scss'

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
        <img src="/logo-1.svg" alt="公共電視 P#新聞實驗室 logo "/>
        <img src="/logo-2.svg" alt="公共電視 P#新聞實驗室 logo "/>
        <img src="/logo-3.svg" alt="公共電視 P#新聞實驗室 logo "/>
      </div>
      <div className={styles.copyRight}>
        Public Television Service Foundation.All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer
