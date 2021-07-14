import React, { createRef } from 'react'
import styles from './Navigation.module.scss'
import { FacebookShare, LineShare } from './ShareButtons'
const { basePath } = require('../next.config.js')

class Navigation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentSectionId: null,
      showUp: false,
    }
    this.onScrollHandler = this._onScrollHandler.bind(this);
    this.node = createRef();
  }

  _handleOnClick(key) {
    if (window) {
      const elem = document.getElementById(`section_${key}`);
      const target = elem.offsetTop - 70;
      if (!elem) {
        return
      }
      window.scrollTo({
        top: target,
        behavior: 'smooth',
      });
    }
  }

  _initiateObserver() {
    const { data } = this.props;
    const { currentSectionId } = this.state;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    }
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          const { id:sectionId } = entry.target
          const id = sectionId.split('_')[1];
          if (currentSectionId !== id) {
            this.setState({
              currentSectionId: id,
            })
          }
        }
      })
    }, options);
    Object.keys(data).forEach((key, index) => {
      const id = `section_${key}`;
      const targetElement = document.getElementById(id);
      observer.observe(targetElement);
    })
  }

  _onScrollHandler() {
    const { showUp } = this.state;
    if (window) {
      if (window.scrollY >= 70 && !showUp) {
        this.setState({
          showUp: true,
        })
      }
      if (window.scrollY < 70 && showUp) {
        this.setState({
          showUp: false,
        })
      }
    }
  }

  componentDidMount () {
    this._initiateObserver();
    if (window) {
      window.addEventListener('scroll', this.onScrollHandler)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScrollHandler)
  }

  render () {
    const { data } = this.props
    const { currentSectionId, showUp } = this.state
    if (!data) {
      return null
    }

    const Content = Object.keys(data).map((key, index) => {
      const className = currentSectionId === key ? styles.highlight : null
      return (
        <label
          className={className}
          key={key}
          onClick={() => {
            this._handleOnClick(key)
          }}
        >
          {data[key]}
        </label>
      )
    })
    const containerClassName =  showUp ? `${styles.navigation} ${styles.showUp}` : `${styles.navigation}`
    return (
      <div
        className={containerClassName}
        ref={this.node}
      >
        <div
          className={styles.flexContainer}
        >
          {Content}
        </div>
      </div>
    )
  }
}

function Header () {
  return (
    <div className={styles.headerContainer}>
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

export {
  Navigation,
  Header
}
