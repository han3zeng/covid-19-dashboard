/* global FB */

window.fbAsyncInit = function () {
  if (FB) {
    FB.init({
      appId: '6178330708847351',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v11.0'
    })
  }
}
