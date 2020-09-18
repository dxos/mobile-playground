import React, {useEffect, useState} from 'react';
import swarm from '@geut/discovery-swarm-webrtc';

import VideoComponent from './VideoComponent';

const VideoTab: React.FC = () => {
  const [connections, setConnections] = useState<any>([]);
  const [streams, setStreams] = useState<any>([]);
  const [receivedData, setReceivedData] = useState<any>('');
  const [selfStream, setSelfStream] = useState<any>(undefined);

  useEffect(() => {
    const sw = swarm({
      bootstrap: ['https://signal.wireline.ninja/'],
    });

    sw.on('connection', (peer: any, info: any) => {
      console.log('New connection', peer, info);
      const connectionId = info.id.toString();
      peer.on('data', (data: any) => setReceivedData(data.toString()));

      const newPeer = { peer, connectionId };
      setConnections((peers: any) => [...peers, newPeer]);

      peer.on('stream', (mediaStream) => setStreams(
        (streams: any) => [...streams, { mediaStream, connectionId }]
      ),);
      peer.on('stream', console.log);
    });

    sw.on('connection-closed', (peer: any, info: any) => {
      console.log('Closed connection', peer, info);
      setStreams((streams: any) => {
        return streams.filter(item => item.connectionId !== info.id.toString());
      });
      setConnections((connections: any) => {
        return connections.filter(item => item.connectionId !== info.id.toString());
      });
    });

    sw.join(Buffer.from('some-topic'));
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

  const handleSendData = (data) => {
    connections.forEach(connection => connection.peer.send(data));
  };

  const handleEnableVideo = () => navigator.getUserMedia(
    { video: true, audio: true },
    (stream) => setSelfStream(stream),
    console.error,
  );

  return (
    <VideoComponent
      connections={connections}
      receivedData={receivedData}
      onReceivedDataRead={() => setReceivedData('')}
      onSendData={handleSendData}
      streams={streams}
      selfStream={selfStream}
      onEnableVideo={handleEnableVideo}
    />
  );
}

export default VideoTab;
