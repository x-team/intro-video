import React from 'react'
import { render } from 'react-dom'
import IntroVideoState from './IntroVideo/demo-state'

function uploadVideo (data) {
  location.href = data.videoUrl
}

render(
  <IntroVideoState uploadVideo={uploadVideo} />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
