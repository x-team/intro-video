import React, { Component } from 'react'
import RecordRTC from 'recordrtc'
import { captureUserMedia, isMediaSupported } from '../util/MediaUtils'

import Pure from './index.js'

// ----

const states = {};

states.init = {
  error: null,
  hasMedia: null,
  countdown: null,
  isRecording: false,
  hasRecorded: false,
  videoSrc: null
}

// instance vars
// - mediaStream
// - audioRecorder
// - videoRecorder
// - audioUrl
// - videoUrl
// - countdownInterval

// props
// - maxDuration
// - uploadVideo()

export default class IntroVideoState extends Component {
  static defaultProps = {
    maxDuration: 60
  }

  constructor (props) {
    super(props)

    this.state = states.init
  }

  componentDidMount () {
    if (!isMediaSupported()) {
      this.setState({ error: new Error('Media not supported') })
      return
    }

    // Initialize the webcam
    captureUserMedia((err, stream) => {
      if (err) {
        return this.setState({ error: err })
      }

      this.mediaStream = stream
      this.audioRecorder = RecordRTC(stream, { type: 'audio' })
      this.videoRecorder = RecordRTC(stream, { type: 'video' })

      this.setState({
        hasMedia: true,
        videoSrc: window.URL.createObjectURL(stream)
      })
    })
  }

  startRecording () {
    const { videoRecorder, audioRecorder } = this
    audioRecorder.startRecording()
    videoRecorder.startRecording()

    this.setState({
      isRecording: true,
      countdown: this.props.maxDuration
    })

    // TODO: move this to a child component (don't need to re-render the entire tree)
    this.countdownInterval = setInterval(() => {
      const { countdown } = this.state
      if (countdown === null) { return }

      if (countdown === 0) {
        return this.stopRecording()
      }

      this.setState({
        countdown: countdown - 1
      })
    }, 1000)
  }

  stopRecording () {
    const { videoRecorder, audioRecorder, mediaStream } = this

    const urls = {
      audio: null,
      video: null
    }

    const check = () => {
      const allDone = urls.audio && urls.video
      if (!allDone) { return }

      this.uploadVideo(urls)

      // Stop webcam
      mediaStream.stop()
    }

    audioRecorder.stopRecording(url => {
      urls.audio = url
      check()
    })

    videoRecorder.stopRecording(url => {
      urls.video = url
      check()
    })

    this.countdownInterval && clearInterval(this.countdownInterval)

    this.setState({
      hasRecorded: true,
      isRecording: false,
      countdown: null
    })
  }

  uploadVideo (urls) {
    if (!this.props.uploadVideo) { return }

    const { audioRecorder, videoRecorder, mediaStream } = this

    this.props.uploadVideo({
      audioBlob: audioRecorder.getBlob(),
      videoBlob: videoRecorder.getBlob(),
      audioUrl: urls.audio,
      videoUrl: urls.video
    })
  }

  render () {
    const callbacks = {
      startRecording: this.startRecording.bind(this),
      stopRecording: this.stopRecording.bind(this)
    }

    return <Pure
      { ...this.state }
      {...callbacks} />
  }
}
