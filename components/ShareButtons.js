/* global FB */
import styles from './ShareButton.module.scss'
const { basePath } = require('../next.config.js');
const target = 'https://news.pts.org.tw/project/covid-tw-2021';

const LineShare = () => {
  return (
    <div className={styles.button}>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(target)}`}
        target="_blank"
        rel="noopener noreferer"
      >
        <img src={`${basePath}/icon-share-line.svg`} alt="line_share_button" />
      </a>
    </div>
  )
}

const FacebookShare = () => {
  const fbShareHandler = () => {
    FB.ui({
      display: 'popup',
      method: 'share',
      href: `${target}`,
    }, function(response){});
  }

  return (
    <div
      className={styles.button}
      onClick={fbShareHandler}
    >
      <img src={`${basePath}/icon-share-fb.svg`} alt="facebook_share_button" />
    </div>
  );
}

export {
  FacebookShare,
  LineShare
}
