import React, { useRef, useEffect } from 'react';
import StackBlitz from './components/stackblitz'
import DraggableCore from 'react-draggable'
import Webcam from "react-webcam";

export default function App() {
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
          {/* <DraggableCore>
            <Webcam
                audio={false}
                width={200}
                height={150}
                mirrored={true}
                screenshotFormat="image/jpeg"
            />
          </DraggableCore> */}
          <video></video>
          <button id="startBtn">Start</button>
          <button id="stopBtn">Stop</button>
          <button id="videoSelectBtn">
            Choose a Video Source
          </button>
        </div>
      </div>
    )
}