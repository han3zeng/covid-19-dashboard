import styles from './Landing.module.scss'
const { basePath } = require('../next.config.js');

function createMarkup (value) {
  return { __html: value }
}

function Landing ({
  data
}) {
  const {
    h1,
    timestamp_updatedAt,
    timestamp_releasedAt,
    stats_confirmedDomesticToday,
    stats_confirmedTotal,
    stats_deathTotal,
    stats_quarantineEndCount,
    stats_vaccinatedRate
  } = data

  return (
    <div className={styles.container}>
      <img style={{ width: "57px" }}src={`${basePath}/icon-live.gif`} />
      <h1 dangerouslySetInnerHTML={createMarkup(h1)} />
      <div>
        <div className={styles.moduleCaption}>{`發布日期：${timestamp_updatedAt}`}</div>
        <div className={styles.moduleCaption}>{`最後更新：${timestamp_releasedAt}`}</div>
      </div>
      <div className={styles.statsGroup}>
        <div className={styles.stat}>
          <div className={styles.moduleCaption}>{stats_confirmedDomesticToday.label}</div>
          <div className={styles.statValue}>{stats_confirmedDomesticToday.value}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.moduleCaption}>{stats_confirmedTotal.label}</div>
          <div className={styles.statValue}>{stats_confirmedTotal.value}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.moduleCaption}>{stats_deathTotal.label}</div>
          <div className={styles.statValue}>{stats_deathTotal.value}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.moduleCaption}>{stats_quarantineEndCount.label}</div>
          <div className={styles.statValue}>{stats_quarantineEndCount.value}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.moduleCaption}>{stats_vaccinatedRate.label}</div>
          <div className={styles.statValue}>{stats_vaccinatedRate.value}</div>
        </div>
      </div>
    </div>
  )
}

export default Landing
