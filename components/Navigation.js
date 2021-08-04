import React, { createRef } from 'react'
import styles from './Navigation.module.scss'
import { FacebookShare, LineShare } from './ShareButtons'
const { basePath } = require('../next.config.js')
import smoothscroll from 'smoothscroll-polyfill'

const offset = 40;

class Navigation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentSectionId: null,
      showUp: false,
    }
    this.onScrollHandler = this._onScrollHandler.bind(this);
    this.node = createRef();
    this.lables = {};
  }

  _scrollToAnchorInternally({
    elem,
  }) {
    if (this.node && this.node.current) {
      const { scrollWidth, clientWidth } = this.node.current;
      if (scrollWidth > clientWidth) {
        this.node.current.scrollTo({
          left: elem.offsetLeft - 6,
          behavior: 'smooth',
        })
      }
    }
  }

  _handleOnClick({
    e,
    key,
  }) {
    if (window) {
      const elem = document.getElementById(`section_${key}`);
      const target = elem.offsetTop - offset;
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
      threshold: 0.2,
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
            const targetAnchorElem = this.labels[`anchor_${id}`];
            this._scrollToAnchorInternally({
              elem: targetAnchorElem,
            });
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
      if (window.scrollY >= offset && !showUp) {
        this.setState({
          showUp: true,
        })
      }
      if (window.scrollY < offset && showUp) {
        this.setState({
          showUp: false,
        })
      }
    }
  }

  componentDidMount () {
    smoothscroll.polyfill()
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
          ref={
            (node) => {
              if (node) {
                this.labels = {
                  ...this.labels,
                  [`anchor_${key}`]: node,
                }
              }
            }
          }
          className={className}
          key={key}
          onClick={(e) => {
            this._handleOnClick({
              e,
              key,
            })
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
        style={{ display: 'flex', alignItems: 'center' }}
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
