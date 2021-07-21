import React from 'react'
import styles from './ReadMore.module.scss'

const clipCount = 3

class More extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      clipped: true
    }
    this.unClip = this._unClip.bind(this)
  }

  _unClip () {
    this.setState({
      clipped: false
    })
  }

  // _renderContent () {
  //   const { data } = this.props
  //   const { clipped } = this.state
  //   const Content = ({
  //     index,
  //     href,
  //     imgUrl,
  //     title,
  //     date
  //   }) => (
  //     <a
  //       href={href}
  //       target="_blank"
  //       rel="noreferrer noopener"
  //       key={`${href}_${index}`}
  //     >
  //       <div className={styles.more}>
  //         <img src={imgUrl}/>
  //         <div>
  //           <div className={styles.title}>{title}</div>
  //           <div className={styles.date}>{date}</div>
  //         </div>
  //       </div>
  //     </a>
  //   )
  //
  //   return data.map((more, index) => {
  //     const { href, imgUrl, title, date } = more;
  //     if (clipped) {
  //       if (index < clipCount) {
  //         return (
  //           <Content
  //             key={`${encodeURIComponent(title)}_${index}`}
  //             index={index}
  //             href={href}
  //             imgUrl={imgUrl}
  //             title={title}
  //             date={date}
  //           />
  //         )
  //       } else {
  //         return null;
  //       }
  //     } else {
  //       return (
  //         <Content
  //           key={`${encodeURIComponent(title)}_${index}`}
  //           index={index}
  //           href={href}
  //           imgUrl={imgUrl}
  //           title={title}
  //           date={date}
  //         />
  //       )
  //     }
  //   })
  // }

  _renderContentV2 () {
    const { data } = this.props
    const { clipped } = this.state
    const finalData = clipped ? data.slice(0, clipCount) : data
    const Content = finalData.map((more, index) => {
      const { href, imgUrl, title, date } = more
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          key={`${href}_${index}`}
        >
          <div className={styles.gridItem} key={index}>
            <div className={styles.testWrapper}>
              <div className={styles.imgWrapper}>
                <img src={imgUrl} />
              </div>
            </div>
            <div className={styles.subDivision}>
              <div className={styles.title}>{title}</div>
              <div className={styles.date}>{date}</div>
            </div>
          </div>
        </a>
      )
    })
    return (
      <div
        className={styles.more}
      >
        {Content}
      </div>
    )
  }

  _renderButton () {
    const { clipped } = this.state
    if (clipped) {
      return (
        <div
          className={styles.button}
          onClick={this.unClip}
        >
          閱讀更多
        </div>
      )
    }
    return null
  }

  render () {
    return (
      <>
        {this._renderContentV2()}
        {this._renderButton()}
      </>
    )
  }
}

function ReadMore ({ data }) {
  return (
    <div className={styles.container}>
      <More data={data} />
    </div>
  )
}

export default ReadMore
