import React from 'react'
import styles from './LandingWithBackground.module.scss'
const { basePath } = require('../next.config.js')

function createMarkup (value) {
  return { __html: value }
}

function LandingWithBackground ({
  data
}) {
  const {
    h1,
    timestamp_updatedAt,
    timestamp_releasedAt
  } = data
  return (
    <div className={styles.background}>
      <img style={{ width: "57px" }}src={`${basePath}/icon-live.gif`} />
      <h1 dangerouslySetInnerHTML={createMarkup(h1)} />
      <div>
        <div className={styles.moduleCaption}>{`發布日期：${timestamp_updatedAt}`}</div>
        <div className={styles.moduleCaption}>{`最後更新：${timestamp_releasedAt}`}</div>
      </div>
    </div>
  )
};

export default LandingWithBackground;
