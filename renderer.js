const { ipcRenderer } = require("electron");

// Global state
let mediaRecorder; // MediaRecorder instance to capture footage
const recordedChunks = [];

// const videoElement = document.getElementById("preview");

// Buttons

// Start recording button

const startBtn = document.getElementById("startBtn");

startBtn.onclick = (e) => {
  console.log("start");
  mediaRecorder.start();
  startBtn.classList.add("is-danger");
  startBtn.innerText = "Recording";
};

// Stop recording button

const stopBtn = document.getElementById("stopBtn");

stopBtn.onclick = (e) => {
  console.log("stopped");
  mediaRecorder.stop();
  startBtn.classList.remove("is-danger");
  startBtn.innerText = "Start";
};

const videoSelectBtn = document.getElementById("videoSelectBtn");
videoSelectBtn.onclick = getVideoSources;

// get video source

// var windowSourceId;

ipcRenderer.on("CAPTURE_SOURCE", async (event, source) => {
  console.log(source);
  videoSelectBtn.innerText = source.name;

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: source.id,
      },
    },
  };

  // Create a Stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  // Preview the source in a video element
  // videoElement.srcObject = stream;
  // videoElement.play();

  // Create the Media Recorder
  const options = { mimeType: "video/webm; codecs=vp9" };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register Event Handlers
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
});

// Get the available video sources

function getVideoSources() {
  // selectSource(windowSourceId);
  ipcRenderer.invoke("GET_VIDEO_SOURCES");
}

// Captures all recorded chunks
function handleDataAvailable(e) {
  console.log("video data available");
  recordedChunks.push(e.data);
}

// Saves the video file on stop
async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: "video/mp4; codecs=vp9",
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  ipcRenderer.invoke("showSaveDialog", buffer);

  // const { filePath } = await dialog.showSaveDialog({
  //   buttonLabel: 'Save video',
  //   defaultPath: `vid-${Date.now()}.webm`
  // });

  // if (filePath) {
  //   writeFile(filePath, buffer, () => console.log('video saved successfully!'));
  // }
}
