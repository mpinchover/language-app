Server should look like

```
const userIdToWs = new Map();

const handleMakeCall = (msg: any) => {
  const { fromPeer, toPeer, data } = msg;
  const callToWS = userIdToWs.get(toPeer);

  const incomingCallData = {
    eventType: "incoming_call",
    fromPeer,
    data,
  };
  callToWS.send(JSON.stringify(incomingCallData));
};

const handleSignalData = (msg: any) => {
  const { data, fromPeer, toPeer } = msg;
  const toPeerWs = userIdToWs.get(toPeer);

  const signalData = {
    eventType: "signal_data",
    signalData: data,
    fromPeer,
    toPeer,
  };

  toPeerWs.send(JSON.stringify(signalData));
};

const handleAnswerCall = (msg: any) => {
  const { data, fromPeer, toPeer } = msg;

  const callRecvrWS = userIdToWs.get(toPeer);
  const callAnsweredData = {
    eventType: "call_answered",
    data,
  };

  callRecvrWS.send(JSON.stringify(callAnsweredData));
};

wss.on("connection", function connection(ws) {
  const newUsername = generateUsername();
  const newUserData = {
    eventType: "new_user",
    data: newUsername,
  };

  userIdToWs.set(newUsername, ws);
  ws.send(JSON.stringify(newUserData));

  ws.on("message", function incoming(message) {
    const msg = JSON.parse(message.toString());
    const eventType = msg.eventType.trim();

    switch (eventType) {
      case "initiator_make_call":
        handleMakeCall(msg);
        break;
      case "answer_call":
        handleAnswerCall(msg);
        break;
      default:
        console.log("unrecognized event type ", eventType);
    }
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```
