export function getUserMedia () {
  return navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
}

export function isMediaSupported () {
  return getUserMedia() != null
}

// Handle user media capture.
export function captureUserMedia (cb) {
  navigator.getUserMedia = getUserMedia()

  if (!navigator.getUserMedia) {
    return cb(new Error('Media not supported'))
  }

  const mediaOpts = {
    audio: true,
    video: true
  }

  navigator.getUserMedia(
    mediaOpts,
    (stream) => cb(null, stream),
    (err) => {
      if (err.name === 'PermissionDeniedError' || err.name === 'NotAllowedError') {
        return cb(new Error('VIDEO_PERMISSION_DENIED'))
      } else {
        return cb(new Error('UNKNOWN_ERROR'))
      }
    })
}
