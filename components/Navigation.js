import styles from './Navigation.module.scss'
import { FacebookShare, LineShare } from './ShareButtons'

function Navigation () {
  return (
    <div className={styles.container}>
      <a
        href="https://newslab.pts.org.tw/"
        target="_blank"
        rel="noopener noreferer"
      >
        <img src="/psharp-logo.svg" alt="公視新聞實驗室 psharp logo"/>
      </a>
      <div className={styles.rightDivision}>
        <FacebookShare />
        <LineShare />
      </div>
    </div>
  )
}

export default Navigation
