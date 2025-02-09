import {
  Box,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  RangeSlider,
  RangeSliderFilledTrack,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { RxScissors } from "react-icons/rx";
import VideoClipPlayer from "./video-clip-player";
import { FaPause, FaPlay } from "react-icons/fa";
import { useTheme } from "@chakra-ui/react";
import { videoClipsStore } from "../../recoil/video";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const STEP = 0.25 * 4;

const Timeline = ({
  displayRange,
  videoRef,
  range,
  setRange,
  setVideoDuration,
  videoDuration,
  playheadValue,
  setPlayheadValue,
  isPlaying,
  setIsPlaying,
  isDragging,
  setIsDragging,
}) => {
  const theme = useTheme();
  const blue500 = theme.colors.blue[600]; // Get the value of "blue.500"

  const minValue = range[0];
  const maxValue = range[1];

  const handleClickPlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      return;
    }
    videoRef.current.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const updatePlayhead = () => {
      if (videoRef.current && isPlaying) {
        setPlayheadValue(
          Math.min(videoDuration, Math.round(videoRef.current?.currentTime))
        );
      }
    };

    const handleTimeUpdate = (e) => {
      if (Math.ceil(videoRef.current?.currentTime) > range[1]) {
        videoRef.current.currentTime = range[0];
        videoRef.current.play();
      }
    };

    const handleEnded = () => {
      // console.log("VIDEO ENDED");
      videoRef.current.currentTime = range[0];
      videoRef.current.play();
    };

    const handleMouseMove = (e) => {
      if (isDragging === null) return;

      const sliderRect = document
        .querySelector(".slider-container")
        .getBoundingClientRect();

      // Calculate the percentage of mouse position within the slider
      let percentage = Math.min(
        Math.max(0, (e.clientX - sliderRect.left) / sliderRect.width),
        1
      );

      // Map percentage to duration and round to the nearest step
      const value = Math.round((percentage * videoDuration) / STEP) * STEP;

      if (isDragging === "min" && value < maxValue) {
        setRange([value, maxValue]);

        videoRef.current.currentTime = Math.min(videoDuration, value);
      } else if (isDragging === "max" && value > minValue) {
        setRange([minValue, value]);
        videoRef.current.currentTime = Math.min(videoDuration, value);
      } else if (
        isDragging === "playhead" &&
        value >= minValue &&
        value <= maxValue
      ) {
        setPlayheadValue(value);
        videoRef.current.currentTime = value;
      }
    };

    const handleMouseUp = () => {
      if (isDragging !== "playhead") {
        videoRef.current.currentTime = minValue;
      }
      setIsDragging(null); // Stop dragging
      videoRef.current.play();
      setIsPlaying(true);
    };

    const handleMouseDown = () => {
      videoRef.current.pause();
      setIsPlaying(false);
    };

    const handleLoadedMetadata = () => {
      const vidDur = Math.ceil(videoRef.current.duration);
      // setDuration(Math.floor(video.duration));
      setRange([0, vidDur]);
      setVideoDuration(vidDur);
      videoRef.current.currentTime = range[0];
    };

    videoRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    videoRef.current?.addEventListener("ended", handleEnded);
    if (isDragging !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousedown", handleMouseDown);
    }

    if (videoRef.current && isPlaying) {
      videoRef.current.addEventListener("timeupdate", updatePlayhead);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
      videoRef.current?.removeEventListener("timeupdate", updatePlayhead);
      videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      videoRef.current?.removeEventListener("ended", handleEnded);
      videoRef.current?.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
    };
  }, [isDragging, range]);

  const leftPercentage = (minValue / videoDuration) * 100;
  const rightPercentage = (maxValue / videoDuration) * 100;
  const playHeadPercentage = (playheadValue / videoDuration) * 100;

  const handleThumbMouseDown = (thumb) => {
    setIsDragging(thumb);
  };

  return (
    <Box
      display="flex"
      backgroundColor="rgba(255, 255, 255, 0.6)"
      position="absolute"
      flexDirection="row"
      bottom="50px"
      left="50px"
      right="50px"
      borderRadius="md"
      style={{
        opacity: displayRange ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        pointerEvents: displayRange ? "auto" : "none",
      }}
    >
      <Box
        marginRight={6}
        marginLeft={6}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        {!isPlaying && (
          <FaPlay
            cursor={"pointer"}
            onClick={handleClickPlay}
            color={blue500}
          />
        )}
        {isPlaying && (
          <FaPause
            cursor={"pointer"}
            onClick={handleClickPlay}
            color={blue500}
          />
        )}
      </Box>
      <Box
        className="slider-container"
        position="relative"
        borderRadius="md"
        h="60px"
        width="full"
      >
        {/* Red range border */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          //   bg="red.500"
          border="4px yellow solid"
          left={`${leftPercentage}%`}
          right={`${100 - rightPercentage}%`}
          zIndex={1}
          borderRadius="md"
        />
        {/* Left Thumb */}
        <Button
          transform="translate(-50%, -50%)"
          position="absolute"
          left={`${leftPercentage}%`}
          top="50%"
          width="10px"
          padding="0"
          minWidth="0"
          zIndex={2}
          onMouseDown={() => handleThumbMouseDown("min")}
        />
        {/* Right Thumb */}
        <Button
          transform="translate(-50%, -50%)"
          position="absolute"
          left={`${rightPercentage}%`}
          top="50%"
          width="10px"
          padding="0"
          minWidth="0"
          zIndex={2}
          onMouseDown={() => handleThumbMouseDown("max")}
        />

        <Button
          transform="translate(-50%, 0)"
          position="absolute"
          left={`${playHeadPercentage}%`}
          top="0%"
          bottom="0%"
          height="100%"
          width="10px"
          padding="0"
          minWidth="0"
          backgroundColor="transparent"
          _focus={{}}
          _active={{}}
          _selected={{}}
          // backgroundColor={"red"}
          zIndex={5}
          _hover={{}}
          onMouseDown={() => handleThumbMouseDown("playhead")}
        >
          <Box
            position="absolute"
            top="0%"
            width={6}
            height={1}
            backgroundColor={"red"}
          ></Box>
          <Box
            position="absolute"
            bottom="0%"
            width={1}
            backgroundColor={"red"}
            height="100%"
            top="0%"
          ></Box>
          <Box
            position="absolute"
            bottom="0%"
            width={6}
            height={1}
            backgroundColor={"red"}
          ></Box>
        </Button>
      </Box>
    </Box>
  );
};

export default Timeline;
