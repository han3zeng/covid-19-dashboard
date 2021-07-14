import React from 'react'
import dynamic from 'next/dynamic'
// const IFrame = dynamic(() => import('../components/IFrame'), { ssr: false })
import IFrame from '../components/IFrame';
import styles from './Content.module.scss';

const H2 = 'h2'
const PARAGRAPH = 'paragraph'
const IFRAME = 'iframe'
const CAPTION = 'caption'

function createMarkup (value) {
  return { __html: value }
}

const Components = ({
  elem
}) => {
  const { type, value, desktopWidth } = elem
  if (type === PARAGRAPH) {
    return (<p className={styles.paragraph} dangerouslySetInnerHTML={createMarkup(value)} />)
  } else if (type === IFRAME) {
    return (<IFrame value={value} desktopWidth={desktopWidth} />)
  } else if (type === CAPTION) {
    return (<div className="caption" dangerouslySetInnerHTML={createMarkup(value)} />)
  } else {
    return null
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  _rednerContent() {
    const { data } = this.props;
    return data.map((section, index) => {
      const { type, value, sectionId, sectionContent } = section;
      return (
        <section
          key={sectionId}
          className={styles.section}
          id={`section_${sectionId}`}
        >
          <h2>{value}</h2>
          {sectionContent.map((elem, index) => {
            return (
              <Components
                elem={elem}
                key={`${elem.type}_${index}`}
              />
            );
          })}
        </section>
      )
    })
  }

  render () {
    return (
      <div className={styles.container}>
        {this._rednerContent()}
      </div>
    )
  }
}

export default Content
