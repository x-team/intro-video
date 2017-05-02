import React from 'react'
import { render } from 'react-dom'
import IntroVideoState from './IntroVideo/state'

function uploadVideo (data) {
  console.log(data)
  document.body.innerHTML = `
ok
`

  const video = document.createElement('video')
  video.src = data.videoUrl
  video.autoplay = true
  document.body.appendChild(video)

  location.href = data.videoUrl
}

render(
  <IntroVideoState uploadVideo={uploadVideo} />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
