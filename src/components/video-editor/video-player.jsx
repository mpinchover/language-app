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
  // const [duration, setDuration] = useState(0);
  const [range, setRange] = useState([0, 0]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [ranges, setRanges] = useState([]);
  const [playheadValue, setPlayheadValue] = useState(0); // Right thumb value
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(null); // Tracks which thumb is being dragged
  const [videoDuration, setVideoDuration] = useState(0);

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

  // you probably need to set the range to 0, duratin and then use some offset
  //
  const handleZoomIn = () => {
    const _startTime = range[0];
    const _endTime = range[1];
    const newDuration = _endTime - _startTime;

    setVideoDuration(newDuration);
    setRange([0, newDuration]);
    videoRef.current.currentTime = _startTime;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
  }, [videoDuration]);

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
        // loop
        muted
        style={{
          height: "100%",
          objectFit: "contain",
        }}
      />

      <Timeline
        videoDuration={videoDuration}
        setVideoDuration={setVideoDuration}
        range={range}
        setRange={setRange}
        videoRef={videoRef}
        displayRange={displayRange}
        playheadValue={playheadValue}
        setPlayheadValue={setPlayheadValue}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
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
          handleClick={handleZoomIn}
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
