import styles from './Navigation.module.scss'
import { FacebookShare, LineShare } from './ShareButtons'
const { basePath } = require('../next.config.js')

function Navigation () {
  return (
    <div className={styles.container}>
      <a
        href="https://newslab.pts.org.tw/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={`${basePath}/psharp-logo.svg`} alt="公視新聞實驗室 psharp logo"/>
      </a>
      <div className={styles.rightDivision}>
        <FacebookShare />
        <LineShare />
      </div>
    </div>
  )
}

export default Navigation
