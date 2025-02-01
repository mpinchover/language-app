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
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { RiArrowGoBackFill } from "react-icons/ri";
import VideoClipPlayer from "./video-clip-player";
import { FaPause, FaPlay } from "react-icons/fa";
import { useTheme } from "@chakra-ui/react";
import { videoClipsStore } from "../../recoil/video";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Timeline from "./timeline";

const VideoUIButton = ({ displayRange, handleClick, icon }) => {
  return (
    <Box
      style={{
        opacity: displayRange ? 1 : 0, // Animate opacity
        transition: "opacity 0.3s ease-in-out", // Smooth transition
        pointerEvents: displayRange ? "auto" : "none", // Disable interaction when hidden
      }}
    >
      <Button onClick={handleClick}>{icon}</Button>
    </Box>
  );
};

const videoURL = "https://storage.googleapis.com/video-editor-uploads/demo.mp4";

const VideoPlayer = ({ saveVideoCut }) => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [range, setRange] = useState([0, 0]);

  const [displayRange, setDisplayRange] = useState(false);
  const theme = useTheme();
  const blue500 = theme.colors.blue[600]; // Get the value of "blue.500"

  const handleCut = () => {
    const startTime = range[0];
    let endTime = range[1];
    if (endTime > videoRef?.current.duration) {
      endTime = videoRef?.current.duration;
    }
    saveVideoCut({
      src: videoURL,
      startTime,
      endTime,
      id: uuidv4(),
    });
    // setRange([1, videoRef.current.duration]);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const handleTimeUpdate = (e) => {
      if (video.currentTime >= range[1] && !video.paused) {
        video.currentTime = range[0];
      }
    };

    const handleLoadedMetadata = () => {
      const vidDur = Math.ceil(video.duration);
      setDuration(Math.floor(video.duration));
      setRange([0, vidDur]);
      video.currentTime = range[0];
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [range]);

  const onMouseEnterVideo = () => {
    setDisplayRange(true);
  };

  const onMouseLeaveVideo = () => {
    setDisplayRange(false);
  };

  return (
    <Box
      onMouseEnter={onMouseEnterVideo}
      onMouseLeave={onMouseLeaveVideo}
      position={"relative"}
      backgroundColor="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flex={1}
      width="100%"
    >
      <video
        ref={videoRef}
        src={videoURL}
        loop
        muted
        style={{
          height: "100%",
          objectFit: "contain",
        }}
      />

      <Timeline
        range={range}
        setRange={setRange}
        duration={duration}
        videoRef={videoRef}
        displayRange={displayRange}
      />
      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        position="absolute"
        right="50px"
        top="50px"
      >
        <VideoUIButton
          icon={<RxScissors />}
          handleClick={handleCut}
          displayRange={displayRange}
        />
        <VideoUIButton
          icon={<HiMagnifyingGlassPlus />}
          handleClick={handleCut}
          displayRange={displayRange}
        />
        <VideoUIButton
          icon={<RiArrowGoBackFill />}
          handleClick={handleCut}
          displayRange={displayRange}
        />
      </Box>
    </Box>
  );
};

export default VideoPlayer;
