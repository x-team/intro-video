import React, { Component } from 'react'
import cmz from 'cmz';

const styles = {}

// wraps a `<video>` element, and prevents updates
class Vid extends Component {
  shouldUpdate () {
    return false
  }

  render () {
    return <video {...this.props} />
  }
}

function Countdown (props) {
  return <div className='webcam-timer'>{props.value}</div>
}

function Controls (props) {
  const {
    hasRecorded,
    isRecording,
    icons,
    startRecording,
    stopRecording
  } = props

  if (hasRecorded) {
    return null
  }

  return isRecording ?
    (<button onClick={stopRecording}>
      {icons ? <Icon name={icons.stop} /> : null}
      Stop
    </button>) :
    (<button onClick={startRecording}>
      {icons ? <Icon name={icons.start} /> : null}
      Record
    </button>)
}

Controls.defaultProps = {
  hasRecorded: false,
  isRecording: false
}

function IntroVideo (props) {
  if (props.error) {
    return <div>Error: {props.error.toString()}</div>
  }

  if (!props.hasMedia) {
    return <div>Loading...</div>
  }

  const video = props.videoSrc ?
        <Vid
          className='video'
          src={props.videoSrc}
          autoPlay
          muted /> :
        null

  const countdown = props.countdown ?
        <Countdown value={props.countdown} /> :
        null

  return(
    <div className={styles.root}>
      {video}
      {countdown}

      <Controls
        startRecording={props.startRecording}
        stopRecording={props.stopRecording}
        hasRecorded={props.hasRecorded}
        isRecording={props.isRecording} />
    </div>
  )
}

module.exports = IntroVideo
