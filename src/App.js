import React, { useRef, useEffect } from 'react';
import StackBlitz from './components/stackblitz'
const { desktopCapturer, remote } = require('electron');
import DraggableCore from 'react-draggable'
import Webcam from "react-webcam";

export default function App() {

  const videoRef = useRef();

  let recordedChunks = [];
  let videoElement = ''



  useEffect(() => {
    videoElement = videoRef.current;
  }, [])


  // clear video element
  function removeVideoSource() {
    recordedChunks = [];
    // stop camera
    // a video's MediaStream object is available through its srcObject attribute
    const mediaStream = videoElement.srcObject;
    // through the MediaStream, get the MediaStreamTracks with getTracks():
    const tracks = mediaStream?.getTracks();
    tracks?.forEach(track => track.stop());
    videoElement.srcObject = null;
  }

  async function getVideoSources() {
    removeVideoSource(); // sets video elements source to default
    // const inputSources = await desktopCapturer.getSources({
    //   types: ['window', 'screen']
    // });
    const inputSources = await desktopCapturer.getSources({ types: ['window', 'screen'] }, (_ignore, sources) => {
      for (const source of sources) {
        console.log(source);
      }
    });

    // console.log(inputSources);
    // const videoOptionsMenu = Menu.buildFromTemplate(
    //   inputSources.map(source => {
    //     return {
    //       label: source.name,
    //       click: () => selectSource(source)
    //     };
    //   })
    // );

    // videoOptionsMenu.popup();
  }

    return (
      <div id="contentWrapper">
        {/* <StackBlitz
          template="create-react-app"
          title="Mentor Studio - Powered by Stackblitz"
          description="Mentor Studio v1.0"
          tags={["stackblitz", "mentor", "react"]}
          embedOpts={{
            elementOrId: 'editor',
            clickToLoad: false,
            forceEmbedLayout: true,
            hideExplorer: false,
            hideNavigation: false,
          }}
          dependencies={{
            "react": "17.0.1",
            "react-dom": "17.0.1",
            "@babel/runtime": "7.12.5",
          }}
          files={{
            "index.html": `<div id="root"></div>`,
            "index.js": `import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './app';

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );`,
            "app.js": `import React from 'react';

  function App() {
    return (
      <div>Let's start learning React!</div>
    );
  }

  export default App;`
          }}
        /> */}
        <div id="editor"></div>
        <div id="footer">
          <button onClick={getVideoSources}>Get video sources</button>
          <DraggableCore>
            <Webcam
                audio={false}
                width={200}
                height={150}
                mirrored={true}
                screenshotFormat="image/jpeg"
            />
          </DraggableCore>
          <video ref={videoRef}></video>
        </div>
      </div>
    )
}