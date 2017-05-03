import React, { Component } from 'react'
import IntroVideoState from './state.js'
import Pure from './index'

const presets = {};

presets.init = {
  error: null,
  hasMedia: null,
  countdown: null,
  isRecording: false,
  hasRecorded: false,
  videoSrc: null
}

presets.error = {
  ...presets.init,
  error: new Error('hey')
}

presets.withMedia = {
  ...presets.init,
  hasMedia: true,
  videoSrc: 'http://dl1.webmfiles.org/big-buck-bunny_trailer.webm'
}

presets.recording = {
  ...presets.withMedia,
  isRecording: true,
  countdown: 10
}

presets.finished = {
  ...presets.withMedia,
  hasRecorded: true
}

export default class IntroVideoDemo extends Component {
  constructor (props) {
    super(props)

    this.state = presets.finished
  }

  render () {
    return <Pure {...this.state} />
  }
}
