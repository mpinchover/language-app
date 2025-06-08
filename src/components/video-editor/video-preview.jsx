import {
  Box,
  Button,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { videoClipsStore } from "../../recoil/video";
import VideoClipsList from "./video-clips-list";
import { FaChevronDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TextBox = ({ e, idx, handleMouseDown }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.width = `${textarea.scrollWidth}px`;
    }
  }, [e.text]);

  return (
    <Input
      ref={textareaRef}
      readOnly
      value={e.text}
      border="none"
      fontSize="30px"
      fontWeight="800"
      textAlign="center"
      zIndex="10"
      cursor={e.canEdit ? "text" : "grab"}
      userSelect="none"
      padding="0px"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${e.x}px, ${e.y}px)`,
        textShadow: "1px 1px 2px rgba(0, 8, 255, 0.5)",
        boxShadow: "10px 10px red",
      }}
      onMouseDown={(event) => handleMouseDown(event, idx)}
    />
  );
};

const VideoPlayer = ({
  handleLoadedMetadata,
  handleTimeUpdate,
  vidIndex,
  videoClips,
  videoRef,
  handleEnded,
  setTextBoxes,
  textBoxes,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [startPosition, setStartPosition] = useState(null);

  const handleMouseDown = (e, idx) => {
    e.preventDefault();
    if (isDragging) return;
    setIsDragging(true);
    setDragIndex(idx);
    const rect = e.target.getBoundingClientRect();
    setStartPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    document.body.style.userSelect = "none";
  };

  // const handleMouseMove = (e) => {
  //   if (!isDragging || dragIndex === null) return;

  //   const rect = videoRef.current.getBoundingClientRect();
  //   const newX = e.clientX - rect.left - startPosition.x;
  //   const newY = e.clientY - rect.top - startPosition.y;

  //   setTextBoxes((prev) =>
  //     prev.map((box, idx) =>
  //       idx === dragIndex ? { ...box, x: newX, y: newY } : box
  //     )
  //   );
  // };

  const handleMouseMove = (e) => {
    if (!isDragging || dragIndex === null) return;

    requestAnimationFrame(() => {
      const rect = videoRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - startPosition.x;
      const newY = e.clientY - rect.top - startPosition.y;

      setTextBoxes((prev) =>
        prev.map((box, idx) =>
          idx === dragIndex ? { ...box, x: newX, y: newY } : box
        )
      );
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragIndex(null);
    setStartPosition(null);
    document.body.style.userSelect = ""; // Re-enable text selection
  };

  return (
    <Box
      onMouseMove={isDragging ? handleMouseMove : null}
      onMouseUp={handleMouseUp}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex="1"
      width="100%"
    >
      <video
        display="flex"
        flex="1"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        autoPlay={true}
        onEnded={handleEnded}
        ref={videoRef}
        src={videoClips[vidIndex]?.src}
        muted
        style={{
          height: "100%",
          objectFit: "contain",
        }}
      />
      {textBoxes.map((e, idx) => (
        <TextBox key={idx} e={e} idx={idx} handleMouseDown={handleMouseDown} />
      ))}
    </Box>
  );
};

const TextEditing = ({ textBoxes, setTextBoxes }) => {
  const handleAdd = () => {
    const newBox = {
      x: 50,
      y: 50,
      startTime: 1,
      endTime: 10,
      opacity: 1,
      text: "New text",
      canEdit: false,
    };
    setTextBoxes((prev) => [...prev, newBox]);
  };

  const setText = (e, idx, field) => {
    const newVal = e.target.value;
    setTextBoxes((prev) =>
      prev.map((box, i) => (i === idx ? { ...box, [field]: newVal } : box))
    );
  };

  return (
    <Box
      p="4"
      display="flex"
      backgroundColor="white"
      border="1px solid"
      width="300px"
      height="100%"
      flexDirection="column"
    >
      <Button onClick={handleAdd} width="100%">
        Add
      </Button>
      {textBoxes.map((e, idx) => (
        <Box
          key={idx}
          mt="2"
          display="flex"
          flexDirection="column"
          userSelect="none"
        >
          <Input
            mb="2"
            value={e.text}
            onChange={(event) => setText(event, idx, "text")}
          />
        </Box>
      ))}
    </Box>
  );
};

const VideoPreview = () => {
  const [vidIndex, setVidIndex] = useState(0);
  const videoClips = useRecoilValue(videoClipsStore);
  const videoRef = useRef(null);
  const [textBoxes, setTextBoxes] = useState([]);

  useEffect(() => {
    videoRef.current?.addEventListener("timeupdate", (e) => {
      const currentTime = Math.ceil(e.target.currentTime);
      const [start, end] = [
        videoClips[vidIndex]?.startTime,
        videoClips[vidIndex]?.endTime,
      ];
      if (currentTime > end) {
        videoRef.current.currentTime = start;
        videoRef.current.play();
      }
    });
  }, [vidIndex, videoClips]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flex="1"
    >
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="black"
        width="100%"
      >
        <VideoPlayer
          setTextBoxes={setTextBoxes}
          textBoxes={textBoxes}
          vidIndex={vidIndex}
          videoRef={videoRef}
          videoClips={videoClips}
        />
        <TextEditing setTextBoxes={setTextBoxes} textBoxes={textBoxes} />
      </Box>
      {videoClips.length > 0 && <VideoClipsList videoClips={videoClips} />}
    </Box>
  );
};

export default VideoPreview;
