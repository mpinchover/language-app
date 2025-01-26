import { Box, Button, Text, Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { v4 as uuidv4 } from "uuid";

const CallForm = ({ handleMakeCall, remotePeerID, setRemotePeerID }) => {
  return (
    <Box mt={2} alignItems={"center"} display="flex" flexDirection="row">
      <Button
        onClick={handleMakeCall}
        disabled={remotePeerID?.length === 0}
        mr={2}
      >
        Call
      </Button>
      <Input
        onChange={(e) => {
          setRemotePeerID(e.target.value.replace(/\s/g, "_"));
        }}
        value={remotePeerID}
        width={400}
        placeholder="Enter remote peer ID"
      />
    </Box>
  );
};

const VideoChat = () => {
  const wsRef = useRef();
  const remotePeerIDRef = useRef();
  const currentIDRef = useRef();
  const [currentID, setCurrentID] = useState("");
  const [remotePeerID, setRemotePeerID] = useState("");
  const peerRef = useRef();
  const [isCalling, setIsCalling] = useState(false);
  const toast = useToast();
  const streamRef = useRef();

  const videoRef = useRef();
  const remotePeerVideoRef = useRef();

  currentIDRef.current = currentID;
  remotePeerIDRef.current = remotePeerID;

  const handleCallAnswered = (msg) => {
    toast({
      title: `Call has been answered by ${remotePeerIDRef.current}`,
      // description: "We've created your account for you.",
      status: "success",
      duration: 10000,
      isClosable: true,
    });

    const { data } = msg;
    peerRef.current.signal(data);
  };

  const handleMakeCall = () => {
    toast({
      title: `Attempting to connect with ${remotePeerID}`,
      status: "success",
      duration: 10000,
      isClosable: true,
    });

    const peer = new Peer({
      trickle: false,
      initiator: true,
      stream: streamRef.current,
    });

    peer.on("signal", (data) => {
      const signalData = {
        eventType: "initiator_make_call",
        data,
        fromPeer: currentIDRef.current,
        toPeer: remotePeerIDRef.current,
      };

      wsRef.current.send(JSON.stringify(signalData));
    });

    peer.on("connect", (data) => {
      toast({
        title: `Connection established with ${remotePeerIDRef.current}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });

    peer.on("stream", (stream) => {
      remotePeerVideoRef.current.srcObject = stream;
      remotePeerVideoRef.current.play();
      toast({
        title: `Got video stream from  ${remotePeerIDRef.current}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });

    peerRef.current = peer;
  };

  const handleIncomingCall = (msg) => {
    const { data, fromPeer } = msg;

    console.log("Creating a new peer");
    const peer = new Peer({ trickle: false, stream: streamRef.current });

    peer.on("connect", (data) => {
      toast({
        title: `[recv] Connection established with ${remotePeerIDRef.current}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });

    peer.on("signal", (data) => {
      console.log("RECV Signal acquired");
      const signalData = {
        eventType: "answer_call",
        data,
        fromPeer: currentIDRef.current,
        toPeer: fromPeer,
      };
      wsRef.current.send(JSON.stringify(signalData));
    });

    peer.on("stream", (stream) => {
      remotePeerVideoRef.current.srcObject = stream;
      remotePeerVideoRef.current.play();
      toast({
        title: `[recv] Got video stream from  ${remotePeerIDRef.current}`,
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });
    peerRef.current = peer;
    peerRef.current.signal(data);
  };

  useEffect(() => {
    // get video/voice stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log("Setting stream");
        streamRef.current = stream;

        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(() => {});

    const socket = new WebSocket("ws://localhost:5100");
    wsRef.current = socket;

    socket.onopen = () => {};

    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);

      switch (message.eventType) {
        case "new_user":
          setCurrentID(message.data);
          break;
        case "incoming_call":
          handleIncomingCall(message);
          break;
        case "call_answered":
          handleCallAnswered(message);
        default:
          console.log("Received unknown event type");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Box p={6}>
      <Box display="flex" flexDirection="row">
        <Text display="inline">Hello, </Text>
        <Text display="inline" fontWeight={"bold"}>
          {currentID?.replace(/\s/g, "_")}
        </Text>
      </Box>
      {!isCalling && (
        <CallForm
          handleMakeCall={handleMakeCall}
          remotePeerID={remotePeerID}
          setRemotePeerID={setRemotePeerID}
        />
      )}
      <Box mt={2} display="flex" flexDir={"row"}>
        <Box
          border="solid 2px red"
          width={400}
          height={400}
          objectFit={"contain"}
        >
          <video height="100%" width="100%" ref={videoRef} />
        </Box>
        <Box
          border="solid 2px red"
          width={400}
          height={400}
          objectFit={"contain"}
        >
          <video height="100%" width="100%" ref={remotePeerVideoRef} />
        </Box>
      </Box>
    </Box>
  );
};

export default VideoChat;
