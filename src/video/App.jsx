//
// Copyright 2020 Wireline, Inc.
//

import React, { useRef, useEffect, useState } from 'react';
import swarm from '@geut/discovery-swarm-webrtc';
import PropTypes from 'prop-types';

import { config } from './config';

export const App = () => {
  const [selfStream, setSelfStream] = useState(undefined);
  const [connections, setConnections] = useState([]);
  const [streams, setStreams] = useState([]);
  const [arbitraryData, setArbitraryData] = useState('');
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    const sw = swarm({
      bootstrap: [config.signalingServer],
    });

    sw.join(Buffer.from('some-topic'));

    sw.on('connection', (peer, info) => {
      console.log('New connection', peer, info);
      const connectionId = info.id.toString();
      peer.on('data', (data) => setReceivedData(data.toString()));

      const newPeer = { peer, connectionId };
      setConnections((peers) => [...peers, newPeer]);

      peer.on('stream', (mediaStream) => setStreams(
        (streams) => [...streams, { mediaStream, connectionId }]
      ),);
      peer.on('stream', console.log);
    });

    sw.on('connection-closed', (peer, info) => {
      console.log('Closed connection', peer, info);
      setStreams((streams) => {
        return streams.filter(item => item.connectionId !== info.id.toString());
      });
      setConnections((connections) => {
        return connections.filter(item => item.connectionId !== info.id.toString());
      });
    });
  }, []);

  useEffect(() => {
    if (selfStream === undefined) {
      return;
    }
    connections.forEach(connection => {
      try {
        connection.peer.addStream(selfStream);
      } catch (e) {
        if (e.code !== 'ERR_SENDER_ALREADY_ADDED') {
          throw e;
        }
      }
    });
  }, [selfStream, connections]);

  const onSendArbitrary = () => {
    connections.forEach(connection => connection.peer.send(arbitraryData));
    setArbitraryData('');
  };

  const onEnableVideo = () => navigator.getUserMedia(
    { video: true, audio: true },
    (stream) => setSelfStream(stream),
    console.error,
  );

  return (
    <div className="App">
      <header className="App-header">
        <h2>Video conference demo</h2>

        <h3>Stats</h3>
        <p>Connections: {connections.length}</p>
        <p>Video: {selfStream ? 'Enabled' : 'Disabled'}</p>
        {receivedData && <p>Received data: {receivedData}</p>}

        <h3>Options</h3>
        <input type="text" value={arbitraryData} onChange={(e) => setArbitraryData(e.target.value)} />
        <button type="button" onClick={onSendArbitrary}>Send arbitrary data</button>
        <br />
        {!selfStream && <button type="button" onClick={onEnableVideo}>Enable video</button>}

        <h3>Conference</h3>
        {selfStream && <VideoFix style={{ transform: 'scaleX(-1)' }} muted={true} autoPlay srcObject={selfStream} />}
        {streams.map((stream, i) => <VideoFix key={i} autoPlay srcObject={stream.mediaStream} />)}
      </header>
    </div>
  );
};

/*
  The 'video' tag cannot be used directly in React because we cannot set its srcObject attribute
  See https://github.com/facebook/react/issues/11163 for more details
  Hence VideoFix component, a simple wrapper around the 'video' tag
*/
const VideoFix = ({ srcObject, ...rest }) => {
  const el = useRef(null);
  useEffect(() => {
    if (el.current) {
      el.current.srcObject = srcObject;
    }
  }, [el.current]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={el} {...rest} />;
};

VideoFix.propTypes = {
  srcObject: PropTypes.object.isRequired,
};
