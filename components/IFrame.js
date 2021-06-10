import styles from './IFrame.module.scss'

function createMarkup (value) {
  return { __html: value }
}

function IFrame ({ value, desktopWidth }) {
  return (
    <div
      className={styles.container}
      style={ { width: desktopWidth }}
      dangerouslySetInnerHTML={createMarkup(value)}
    />
  )
}

export default IFrame
