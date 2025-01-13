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
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
const VideoChat = () => {
  // const [ws, setWs] = useState(null);
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
  const connectionCreated = useRef();

  currentIDRef.current = currentID;
  remotePeerIDRef.current = remotePeerID;

  const handleCallAnswered = (msg) => {
    toast({
      title: `Call has been answered by`,
      // description: "We've created your account for you.",
      status: "success",
      duration: 10000,
      isClosable: true,
    });

    const { data } = msg;
    console.log("DATA IS ", data);
    peerRef.current.signal(data);
  };

  const handleMakeCall = () => {
    currentIDRef.current = currentID;
    remotePeerIDRef.current = remotePeerID.replace(/\s/g, "_");

    toast({
      title: `Attempting to connect with ${remotePeerID}`,
      // description: "We've created your account for you.",
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

      console.log("initiator has signal");
      wsRef.current.send(JSON.stringify(signalData));
    });

    peer.on("connect", (data) => {
      console.log("initiator has connection");
      toast({
        title: `Connection established with ${remotePeerIDRef.current}`,
        // description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });

    peer.on("stream", (stream) => {
      console.log("initiator has remote stream");
      remotePeerVideoRef.current.srcObject = stream;
      remotePeerVideoRef.current.play();
      toast({
        title: `Got video stream from  ${remotePeerIDRef.current}`,
        // description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });
    peerRef.current = peer;
  };

  const handleIncomingCall = (msg) => {
    const { data: signalData, fromPeer } = msg;

    if (!peerRef.current) {
      console.log("Creating a new peer");
      const peer = new Peer({ trickle: false, stream: streamRef.current });
      // peer.signal(signalData);

      peer.on("connect", (data) => {
        toast({
          title: `[recv] Connection established with ${remotePeerIDRef.current}`,
          // description: "We've created your account for you.",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      });

      peer.on("signal", (_data) => {
        // sleep(1000);
        console.log("RECV Signal acquired");
        const _signalData = {
          eventType: "answer_call",
          data: _data,
          fromPeer: currentIDRef.current,
          toPeer: fromPeer,
        };

        // console.log("Sending signal 1", signalData);
        wsRef.current.send(JSON.stringify(_signalData));
      });

      peer.on("stream", (stream) => {
        remotePeerVideoRef.current.srcObject = stream;
        remotePeerVideoRef.current.play();
        toast({
          title: `[recv] Got video stream from  ${remotePeerIDRef.current}`,
          // description: "We've created your account for you.",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      });
      peerRef.current = peer;
    }
    peerRef.current.signal(signalData);
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
      {/* {isCalling && (
        <Text display="inline">
          Calling{" "}
          <Text display="inline" fontWeight={"bold"}>
            {remotePeerIDRef.current}
          </Text>
          ...
        </Text>
      )} */}
      {/* {remotePeerIDRef.current && (
        <Button onClick={handleAnswerCall} mt={2}>
          Answer call
        </Button>
      )} */}
    </Box>
  );
};

export default VideoChat;
