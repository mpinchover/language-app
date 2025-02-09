import {
  Box,
  Button,
  Divider,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
// import VideoClipPlayer from "./video-clip";
import { videoClipsStore } from "../../recoil/video";
import VideoClipsList from "./video-clips-list";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import {
  SketchPicker,
  SwatchesPicker,
  PhotoshopPicker,
  ChromePicker,
} from "react-color";

const TextBox = ({ e, idx, handleMouseDown }) => {
  const textareaRef = useRef(null);

  // Function to adjust the height of the textarea to fit the content
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.width = "auto";
      // textarea.style.height = "auto"; // Reset the height to recalculate
      textarea.style.width = textarea.scrollWidth + "px"; // Set height to fit content
    }
  };

  // Adjust the height whenever the content changes
  // adjust by the scrollheight + px
  useEffect(() => {
    adjustHeight();
  }, [e.text]);

  return (
    <Input
      border="none"
      fontSize={30}
      textShadow={"1px 1px 2px rgba(0, 8, 255, 0.5)"}
      fontWeight={800}
      textAlign="center"
      ref={textareaRef}
      readOnly
      zIndex={10}
      style={{
        whiteSpace: "normal",
        overflow: "hidden",
        width: "auto",
        boxShadow: "10px 10px red",
        // textShadow: "1px 1px 2px rgba(255, 0, 0, 0.5)",
      }}
      cursor={e.canEdit ? "cursor" : "grab"}
      userSelect={"none"}
      padding="0px"
      onMouseDown={(event) => handleMouseDown(event, idx)}
      width="auto"
      position="absolute"
      top={e.y}
      left={e.x}
      // translate="-50% -50%"
      opacity={e.opacity}
      value={e.text}
      // border="solid 1px blue"
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
    if (isDragging) {
      return;
    }
    const rect = e.target.getBoundingClientRect();
    setStartPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    setDragIndex(idx);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || dragIndex === null) return;

    const rect = videoRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setTextBoxes((prev) =>
      prev?.map((box, idx) =>
        idx === dragIndex
          ? {
              ...box,
              x: currentX - startPosition.x,
              y: currentY - startPosition.y,
            }
          : box
      )
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragIndex(null);
    setStartPosition(null);
  };

  const handleClickOnVideoPlayer = () => {
    const newBoxPosition = {
      x: "50%",
      y: "50%",
    };
    setTextBoxes((prev) => [
      ...prev,
      {
        ...newBoxPosition,
        startTime: 1,
        endTime: 10,
        opacity: 0,
        text: "hey there",
      },
    ]);
  };

  const handleTextDoubleClick = (idxToMakeEditable) => {
    setTextBoxes((prev) => {
      return prev?.map((box, i) => {
        if (idxToMakeEditable === i) {
          return {
            ...box,
            canEdit: true,
          };
        }
        return box;
      });
    });
  };

  const onChangeText = (e, i) => {
    const newVal = e.target.value;

    setTextBoxes((prev) => {
      return prev?.map((box, boxIdxToBeChanged) => {
        if (i === boxIdxToBeChanged) {
          return {
            ...box,
            text: newVal,
          };
        }
        return box;
      });
    });
  };

  return (
    <Box
      onMouseMove={isDragging ? handleMouseMove : null}
      // onClick={isDragging ? null : handleClickOnVideoPlayer}
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      position={"relative"}
      // backgroundColor="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      width="100%"
    >
      <video
        display="flex"
        flex={1}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        key={vidIndex}
        // muted={true}
        autoPlay={true}
        onEnded={handleEnded}
        ref={videoRef}
        // width="70%"
        // height={"500px"}
        // width={"500px"}
        src={videoClips[vidIndex].src}
        muted
        style={{
          height: "100%",

          objectFit: "contain",
        }}
      />

      {textBoxes?.map((e, idx) => {
        return (
          <TextBox
            key={idx}
            e={e}
            idx={idx}
            handleTextDoubleClick={handleTextDoubleClick}
            handleMouseDown={handleMouseDown}
            onChangeText={onChangeText}
          />
        );
      })}
    </Box>
  );
};

const TextEditing = ({ textBoxes, setTextBoxes }) => {
  const handleAdd = () => {
    const newBoxPosition = {
      x: "50%",
      y: "50%",
    };
    setTextBoxes((prev) => [
      ...prev,
      {
        ...newBoxPosition,
        startTime: 1,
        endTime: 18,
        opacity: 0,
        text: "hey there",
        canEdit: false,
      },
    ]);
  };

  // console.log("Textboxes are ", textBoxes);

  const setText = (e, i, field) => {
    const newVal = e.target.value;

    setTextBoxes((prev) => {
      return prev.map((box, boxToUpdateIdx) => {
        if (i === boxToUpdateIdx) {
          return {
            ...box,
            [field]: newVal,
          };
        }
        return box;
      });
    });
  };

  const size = "sm";

  return (
    <Box
      p={4}
      display="flex"
      backgroundColor="white"
      border="solid 1px "
      width={300}
      height="100%"
      flexDirection="column"
    >
      <Button onClick={handleAdd} width="100%">
        Add
      </Button>
      {textBoxes?.map((e, i) => {
        return (
          <Box
            key={i}
            mt={2}
            display="flex"
            flexDirection={"column"}
            userSelect={"none"}
            posiiton="relative"
          >
            <Input
              // fontWeight={800}
              size={size}
              mb={2}
              onChange={(e) => setText(e, i, "text")}
              value={e.text}
            />
            <Box display="flex" flexDir={"row"}>
              <Box
                mb={2}
                alignItems={"center"}
                display="flex"
                flexDirection="row"
                rowGap={2}
              >
                <Text fontSize={size} mr={2}>
                  Start
                </Text>
                <Input
                  size={size}
                  mr={2}
                  width={20}
                  onChange={(e) => setText(e, i, "startTime")}
                  value={e.startTime}
                />
                <Text fontSize={size} mr={2}>
                  End
                </Text>
                <Input
                  size={size}
                  width={20}
                  onChange={(e) => setText(e, i, "endTime")}
                  value={e.endTime}
                />
              </Box>
            </Box>

            <Box
              mb={2}
              // border="1px solid"
              alignItems="center"
              display="flex"
              flexDirection="row"
            >
              <Box mr={2}>
                <Menu>
                  <MenuButton
                    size={size}
                    as={Button}
                    rightIcon={<FaChevronDown />}
                  >
                    Fill
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Box backgroundColor="pink" w={4} h={4}></Box>
                    </MenuItem>
                    <MenuItem>
                      <Box backgroundColor="red" w={4} h={4}></Box>
                    </MenuItem>
                    <MenuItem>
                      <Box backgroundColor="white" w={4} h={4}></Box>
                    </MenuItem>
                    <MenuItem>
                      <Box backgroundColor="pink" w={4} h={4}></Box>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>

              <Box>
                <Menu>
                  <MenuButton
                    size={size}
                    as={Button}
                    rightIcon={<FaChevronDown />}
                  >
                    Edge
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Box backgroundColor="pink" w={4} h={4}></Box>
                    </MenuItem>
                    <MenuItem>
                      <Box backgroundColor="red" w={4} h={4}></Box>
                    </MenuItem>
                    <MenuItem>
                      <Box backgroundColor="white" w={4} h={4}></Box>
                    </MenuItem>
                    <MenuItem>
                      <Box backgroundColor="pink" w={4} h={4}></Box>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            <Box
              mb={2}
              alignItems={"center"}
              display="flex"
              flexDirection="row"
              rowGap={2}
            >
              <Box>
                <Menu>
                  <MenuButton
                    size={size}
                    as={Button}
                    rightIcon={<FaChevronDown />}
                  >
                    size
                  </MenuButton>
                  <MenuList>
                    <MenuItem>xs</MenuItem>
                    <MenuItem>sm</MenuItem>
                    <MenuItem>md</MenuItem>
                    <MenuItem>lg</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            <Menu>
              <MenuButton size={size} as={Button} rightIcon={<FaChevronDown />}>
                Font
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>

            {/* <ChromePicker handleChangeComplete={() => {}} />; */}

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button>
                <MdDelete style={{ cursor: "pointer" }} />
              </Button>
            </Box>

            {/* <Divider mt={2} /> */}
          </Box>
        );
      })}
    </Box>
  );
};

const VideoPreview = () => {
  const [vidIndex, setVidIndex] = useState(0);
  const videoClips = useRecoilValue(videoClipsStore);
  const videoRef = useRef(null);
  const [textBoxes, setTextBoxes] = useState([]);

  const [range, setRange] = useState([
    videoClips[vidIndex]?.startTime,
    videoClips[vidIndex]?.endTime,
  ]);

  useEffect(() => {
    const handleTimeUpdate = (e) => {
      if (Math.ceil(videoRef.current?.currentTime) > range[1]) {
        videoRef.current.currentTime = range[0];
        videoRef.current.play();
      }

      // decide which textboxes to show
      setTextBoxes((prev) => {
        const curTime = videoRef.current?.currentTime;

        return prev?.map((e, i) => {
          let opacity = 0;
          if (curTime >= e.startTime && curTime <= e.endTime) {
            // console.log("SETTING OPACTIY");
            opacity = 1;
          }
          return {
            ...e,
            opacity,
          };
        });
      });
    };

    videoRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    // Update the range each time vidIndex changes
    setRange([videoClips[vidIndex]?.startTime, videoClips[vidIndex]?.endTime]);
    return () => {
      videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [vidIndex, videoClips]);

  const handleTimeUpdate = (e) => {
    const video = videoRef.current;
    if (video.currentTime >= range[1]) {
      if (videoClips.length === 1) {
        video.currentTime = range[0];
      } else {
        setVidIndex((prev) => {
          const newIndex = prev + 1;
          return newIndex >= videoClips.length ? 0 : newIndex;
        });
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    video.currentTime = range[0];
    video.play();
  };

  const handleEnded = () => {
    videoRef.current.currentTime = range[0];
    videoRef.current.play();
  };

  if (!videoClips || videoClips.length === 0) return null;

  return (
    <Box
      display={"flex"}
      flex={1}
      flexDirection={"column"}
      //   border="1px solid green"
      justifyContent={"center"}
      alignItems="center"
    >
      <Box
        flex={1}
        justifyContent={"center"}
        alignItems="center"
        display="flex"
        backgroundColor="black"
        width="100%"
        flexDir={"row"}
      >
        <VideoPlayer
          setTextBoxes={setTextBoxes}
          textBoxes={textBoxes}
          vidIndex={vidIndex}
          handleLoadedMetadata={handleLoadedMetadata}
          handleTimeUpdate={handleTimeUpdate}
          videoRef={videoRef}
          videoClips={videoClips}
          handleEnded={handleEnded}
        />
        <TextEditing setTextBoxes={setTextBoxes} textBoxes={textBoxes} />
      </Box>
      {videoClips.length > 0 && (
        <VideoClipsList
          // removeVideoClip={removeVideoClip}
          videoClips={videoClips}
        />
      )}
    </Box>
  );
};

export default VideoPreview;
