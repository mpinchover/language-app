import React, { useRef, useState, useEffect, useContext } from "react";

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Button,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
function VideoClipPlayer({ src, startTime, endTime, idx, removeVideoClip }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const handleTimeUpdate = (e) => {
      if (video.currentTime >= endTime && !video.paused) {
        video.currentTime = startTime;
      }
    };

    const handleLoadedMetadata = () => {
      video.currentTime = startTime;
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const handleRemove = () => {
    removeVideoClip(idx);
  };
  return (
    <Box
      display="flex"
      position={"relative"}
      width="100px"
      //   height="100px"
      backgroundColor="black"
      overflow="hidden"
      aspectRatio={1}
    >
      <video
        muted={true}
        ref={videoRef}
        autoPlay={true}
        src={src}
        loop={true}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Button
        onClick={() => handleRemove(idx)}
        opacity={0.8}
        size="xs"
        position="absolute"
        top="5px"
        right="5px"
      >
        <MdDelete />
      </Button>
    </Box>
  );
}

export default VideoClipPlayer;
