import React from 'react'
import styles from './SubFooter.module.scss'
import { FacebookShare, LineShare } from './ShareButtons'

function SubFooter () {
  return (
    <div
      className={styles.container}
    >
      <FacebookShare />
      <LineShare />
    </div>
  )
}

export default SubFooter
