import React, { useEffect, useState, useCallback } from "react";
import StackBlitz from "./components/stackblitz";
import DraggableCore from "react-draggable";
import Webcam from "react-webcam";
import styled from "styled-components";

const BottomButton = styled.button`
  background: #202327;
  border: 1px solid #323439;
  color: #aaa;
  font-size: 12px;
  margin: 4px 1px;
  padding: 0 18px;
  cursor: pointer;

  &:hover {
    color: #ccc;
    border: 1px solid #444;
  }
`;

export default function App() {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  // check for camera connection, get all video input devices
  const handleDevices = async () => {
    let devices = await navigator.mediaDevices.enumerateDevices();
    setDevices(devices.filter(({ kind }) => kind === "videoinput"));
  };

  // on devices changed
  navigator.mediaDevices.ondevicechange = () => {
    handleDevices();
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);

  return (
    <div id="contentWrapper">
      <StackBlitz
        template="create-react-app"
        title="Mentor Studio - Powered by Stackblitz"
        description="Mentor Studio v1.0"
        tags={["stackblitz", "mentor", "react"]}
        embedOpts={{
          elementOrId: "editor",
          clickToLoad: false,
          forceEmbedLayout: true,
          hideExplorer: false,
          hideNavigation: false,
        }}
        dependencies={{
          react: "17.0.1",
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

  export default App;`,
        }}
      />
      <div id="editor"></div>
      <div id="footer">
        {devices.length > 0 ? (
          <>
            <DraggableCore>
              <div>
                <Webcam
                  videoConstraints={{ deviceId: devices[0].deviceId }}
                  audio={false}
                  width={200}
                  height={150}
                  mirrored={true}
                  screenshotFormat="image/jpeg"
                />
                {devices[0].label || `Device ${key + 1}`}
              </div>
            </DraggableCore>
          </>
        ) : (
          <div>Webcam not found</div>
        )}
        <video id="preview"></video>
        <BottomButton id="startBtn">Start</BottomButton>
        <BottomButton id="stopBtn">Stop</BottomButton>
        <BottomButton id="videoSelectBtn">Choose a Video Source</BottomButton>
      </div>
    </div>
  );
}
