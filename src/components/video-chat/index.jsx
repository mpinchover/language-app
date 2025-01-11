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
  // const [ws, setWs] = useState(null);
  const wsRef = useRef();
  const remotePeerIDRef = useRef();
  const currentIDRef = useRef();
  const [currentID, setCurrentID] = useState("");
  const [remotePeerID, setRemotePeerID] = useState("");
  const peerRef = useRef();
  const [isCalling, setIsCalling] = useState(false);
  const toast = useToast();

  const videoRef = useRef();
  const chattingWithVideoRef = useRef();

  currentIDRef.current = currentID;
  remotePeerIDRef.current = remotePeerID;

  const handleRecvSignalData = (msg) => {
    const { signalData, fromPeer, toPeer } = msg;

    if (!peerRef.current) {
      peerRef.current = new Peer({ trickle: false });
    }

    if (!remotePeerIDRef.current) {
      remotePeerIDRef.current = fromPeer;
    }

    peerRef.current.on("signal", (data) => {
      console.log("Sending signal to peer");
      const signalData = {
        eventType: "signal_data",
        data,
        fromPeer: currentIDRef.current,
        toPeer: remotePeerIDRef.current,
      };

      wsRef.current.send(JSON.stringify(signalData));
    });

    peerRef.current.on("connect", (data) => {
      toast({
        title: `Connection established with ${remotePeerIDRef.current}`,
        // description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });
    peerRef.current.signal(signalData);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5100");
    // const currentId = uuidv4();
    // s/etCurrentID(currentId);
    // setWs(socket);
    wsRef.current = socket;

    socket.onopen = () => {};

    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data);

      switch (message.eventType) {
        // case "incoming_call":
        //   handleIncomingCall(message);
        case "new_user":
          setCurrentID(message.data);
          break;
          // case "call_answered":
          //   handleCallAnswered(message);
          break;
        case "signal_data":
          handleRecvSignalData(message);
          break;
        default:
          console.log("Received unknown event type");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

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

    const peer = new Peer({ trickle: false, initiator: true });
    peerRef.current = peer;

    peer.on("signal", (data) => {
      const signalData = {
        eventType: "signal_data",
        data,
        fromPeer: currentIDRef.current,
        toPeer: remotePeerIDRef.current,
      };
      // console.log("Sending back signal data", signalData);

      // issue is in this closure the ws i undefined
      wsRef.current.send(JSON.stringify(signalData));
    });

    peer.on("connect", (data) => {
      toast({
        title: `Connection established with ${remotePeerIDRef.current}`,
        // description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });
  };

  return (
    <Box p={6}>
      <Box display="flex" flexDirection="row">
        <Text display="inline">Hello, </Text>
        <Text display="inline" fontWeight={"bold"}>
          {currentID?.replace(/_/g, " ")}
        </Text>
      </Box>
      {!isCalling && (
        <CallForm
          handleMakeCall={handleMakeCall}
          remotePeerID={remotePeerID}
          setRemotePeerID={setRemotePeerID}
        />
      )}
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
