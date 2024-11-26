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
import VideoClipsList from "./video-clips-list";

const PlayHead = () => {
  return (
    <Box w="10px" h="20px">
      AA
    </Box>
  );
};

const VideoEditor = () => {
  const [videoClips, setVideoClips] = useRecoilState(videoClipsStore);
  //   const [videoClips, setVideoClips] = useState([]);

  useEffect(() => {}, []);

  const saveVideoCut = (clip) => {
    clip.idx = videoClips.length;
    setVideoClips([...videoClips, clip]);
  };

  const removeVideoClip = (indexToRemove) => {
    setVideoClips((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Box
      flexDirection={"column"}
      flex={1}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <VideoPlayer saveVideoCut={saveVideoCut} />
      {videoClips.length > 0 && (
        <VideoClipsList
          removeVideoClip={removeVideoClip}
          videoClips={videoClips}
        />
      )}
    </Box>
  );
};

export default VideoEditor;
