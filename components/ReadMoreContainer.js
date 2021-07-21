import React from 'react'
import ReadMore from './ReadMore'
import styles from './ReadMoreContainer.module.scss';

function ReadMoreContainer ({ data }) {
  const Content = data.map((entity, index) => {
    const { id, header, content } = entity
    return (
      <div
        className={styles.MoreContainer}
        key={`readMoreCategory_${id}`}
      >
        <h3 style={{ textAlign: 'center' }}>{header}</h3>
        <ReadMore data={content} />
      </div>
    )
  })
  return (
    <section className={styles.section}>
      {Content}
    </section>
  )
}

export default ReadMoreContainer
