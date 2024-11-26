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
import VideoPlayer from "./video-player";

const VideoClipsList = ({ videoClips, removeVideoClip }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent={"flex-start"}
      width="100%"
    >
      {videoClips.map((e, idx) => {
        const { src, startTime, endTime, id } = e;
        return (
          <VideoClipPlayer
            removeVideoClip={removeVideoClip}
            src={src}
            startTime={startTime}
            endTime={endTime}
            idx={idx}
            width="100%"
            key={id}
          />
        );
      })}
    </Box>
  );
};

export default VideoClipsList;
