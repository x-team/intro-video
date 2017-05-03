import React, { Component } from 'react'
import cmz from 'cmz';

const styles = cmz('IntroVideo', {
  root: `
    padding: 131px 0 0 0;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 760px;
    text-align: center;
  `,

  button: `
    & {
      background: #ff5964;
      border: transparent solid 2px;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: 1rem;
      line-height: normal;
      outline: none;
      margin: 0.25em;
      min-width: 290px;
      padding: .75em 2.4em;
      text-decoration: none;
      transition: all .3s ease-out;
      white-space: nowrap;
      text-transform: uppercase;
      font-weight: 700;
    }

    &:hover {
      color: #fff;
      background: #ff737c;
      border-color: transparent;
      text-decoration: none;
    }
  `,

  uploadNotice: `
    color: #920202;
    font-size: .9em;
    letter-spacing: -0.015em;
    line-height: 1em;
    margin: 1em;
  `,

  webcam: `
    & {
      margin: 40px 0;
    }

    & > video {
      outline: 22px solid #f0f0f0;
      width: 100%;
      text-align: center;
      margin: 0 auto 20px;
    }
  `
})

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
    (<button className={styles.button} onClick={stopRecording}>
      {icons ? <Icon name={icons.stop} /> : null}
      Stop
    </button>) :
    (<button className={styles.button} onClick={startRecording}>
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
    return <div>{props.error.toString()}</div>
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
      {props.heading}

      <div className={styles.webcam}>
        {video}
      </div>

      <div className={styles.uploadNotice}>Your video will be uploaded automatically. Before you begin, please make sure your webcam and microphone are working.</div>

      {countdown}

      <Controls
        startRecording={props.startRecording}
        stopRecording={props.stopRecording}
        hasRecorded={props.hasRecorded}
        isRecording={props.isRecording} />
    </div>
  )
}

IntroVideo.defaultProps = {
  title: null
}

module.exports = IntroVideo
