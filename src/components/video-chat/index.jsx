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

  const handleIncomingCall = (msg) => {
    const { callFrom } = msg;
    setRemotePeerID(callFrom);
  };

  // answer incoming call
  const handleAnswerCall = () => {
    currentIDRef.current = currentID;
    const data = {
      eventType: "answer_call",
      callRecvr: currentIDRef.current,
      callFrom: remotePeerIDRef.current,
    };

    wsRef.current.send(JSON.stringify(data));
    toast({
      title: "You have answered incoming call.",
      // description: "We've created your account for you.",
      status: "success",
      duration: 10000,
      isClosable: true,
    });
    console.log("CREATING PEER");
    const peer = new Peer({ trickle: false });
    peerRef.current = peer;

    peer.on("signal", (data) => {
      const signalData = {
        eventType: "signal_data",
        data,
        fromPeer: currentIDRef.current,
        toPeer: remotePeerIDRef.current,
      };
      console.log("Sending back signal data", signalData);
      wsRef.current.send(JSON.stringify(signalData));
    });

    peer.on("connect", (data) => {
      console.log("CONNECTION CREATED");
      toast({
        title: `Connection established with ${remotePeerIDRef.current}`,
        // description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });
  };

  // remote peer has answered your call
  const handleCallAnswered = (msg) => {
    const { callRecvr, callFrom } = msg;

    // the call has been answered
    // so now set up the peers and send the signal data
    toast({
      title: "Remote peer has answered your call.",
      // description: "We've created your account for you.",
      status: "success",
      duration: 10000,
      isClosable: true,
    });

    console.log("CREATING PEER");
    const peer = new Peer({ trickle: false, initiator: true });
    peerRef.current = peer;

    peer.on("signal", (data) => {
      const signalData = {
        eventType: "signal_data",
        data,
        fromPeer: currentIDRef.current,
        toPeer: remotePeerIDRef.current,
      };
      console.log("Sending back signal data", signalData);

      // issue is in this closure the ws i undefined
      wsRef.current.send(JSON.stringify(signalData));
    });

    peer.on("connect", (data) => {
      console.log("CONNECTION CREATED");
      toast({
        title: `Connection established with ${callRecvr}`,
        // description: "We've created your account for you.",
        status: "success",
        duration: 10000,
        isClosable: true,
      });
    });
  };

  const handleRecvSignalData = (msg) => {
    const { signalData } = msg;

    console.log("Handle recvd signal data");
    if (peerRef.current) {
      console.log("CALLING PEER.SIGNAL");
      peerRef.current.signal(signalData);
    }
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
        case "incoming_call":
          handleIncomingCall(message);
        case "new_user":
          setCurrentID(message.data);
          break;
        // case "signal_data":
        //   if (peer) {
        //     peer.signal(message.signalData);
        //   }
        //   break;
        case "call_answered":
          handleCallAnswered(message);
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
    setIsCalling(true);
    currentIDRef.current = currentID;

    const callData = {
      eventType: "make_call",
      callTo: remotePeerIDRef.current.replace(/\s/g, "_"),
      callFrom: currentID,
    };
    wsRef.current.send(JSON.stringify(callData));
  };

  return (
    <Box p={6}>
      <Box display="flex" flexDirection="row">
        <Text display="inline">
          Hello,{" "}
          <Text display="inline" fontWeight={"bold"}>
            {currentID?.replace(/_/g, " ")}
          </Text>
        </Text>
      </Box>
      {!isCalling && (
        <CallForm
          handleMakeCall={handleMakeCall}
          remotePeerID={remotePeerID}
          setRemotePeerID={setRemotePeerID}
        />
      )}
      {isCalling && (
        <Text display="inline">
          Calling{" "}
          <Text display="inline" fontWeight={"bold"}>
            {remotePeerIDRef.current}
          </Text>
          ...
        </Text>
      )}
      {remotePeerIDRef.current && (
        <Button onClick={handleAnswerCall} mt={2}>
          Answer call
        </Button>
      )}
    </Box>
  );
};

export default VideoChat;
