import styles from './Landing.module.scss'

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
      <h1 dangerouslySetInnerHTML={createMarkup(h1)} />
      <div>
        <div className="caption">{`發布日期：${timestamp_updatedAt}`}</div>
        <div className="caption">{`最後更新：${timestamp_releasedAt}`}</div>
      </div>
      <div className={styles.statsGroup}>
        <div className={styles.stat}>
          <div className="caption">{stats_confirmedDomesticToday.label}</div>
          <div className={styles.statValue}>{stats_confirmedDomesticToday.value}</div>
        </div>
        <div className={styles.stat}>
          <div className="caption">{stats_confirmedTotal.label}</div>
          <div className={styles.statValue}>{stats_confirmedTotal.value}</div>
        </div>
        <div className={styles.stat}>
          <div className="caption">{stats_deathTotal.label}</div>
          <div className={styles.statValue}>{stats_deathTotal.value}</div>
        </div>
        <div className={styles.stat}>
          <div className="caption">{stats_quarantineEndCount.label}</div>
          <div className={styles.statValue}>{stats_quarantineEndCount.value}</div>
        </div>
        <div className={styles.stat}>
          <div className="caption">{stats_vaccinatedRate.label}</div>
          <div className={styles.statValue}>{stats_vaccinatedRate.value}</div>
        </div>
      </div>
    </div>
  )
}

export default Landing
