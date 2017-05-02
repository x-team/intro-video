# intro-video

A small UI component for recording and uploading a short video.

## Install

```
npm install
```

## Build frontend

```
npm run packs:build
npm run build -- -w &
npm start
```

NOTE: for local development you need to run this via a static server (`ecstatic` is bundled), as there are some parts of the user media functionality which won't work over `file:///`.

## behavior

### errors

- if we are unable to access the webcam or microphone an error should be displayed.

### record button

- when the `record` button is pressed, a countdown begins
- recording stops when either:
  - the `stop` button is pressed, or
  - the countdown reaches zero
