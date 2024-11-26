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

const VideoClipsList = ({ videoClips }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent={"flex-start"}
      //   border="solid 19px green"
      width="100%"
    >
      {videoClips.map((e, idx) => {
        const { src, startTime, endTime } = e;
        return (
          <VideoClipPlayer
            src={src}
            startTime={startTime}
            endTime={endTime}
            idx={idx}
          />
        );
      })}
    </Box>
  );
};

const PlayHead = () => {
  return (
    <Box w="10px" h="20px">
      AA
    </Box>
  );
};

const STEP = 0.25;
const videoURL =
  "https://storage.googleapis.com/video-editor-uploads/demo_1.mp4";

const VideoPlayer = ({ saveVideoCut }) => {
  const videoRef = useRef(null);
  const sliderRef = useRef(null); // Ref for the input slider
  const [duration, setDuration] = useState(0);
  const [range, setRange] = useState([0, 0]);
  const [overlays, setOverlays] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [newOverlay, setNewOverlay] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [videoClips, setVideoClips] = useState([]);
  const [displayRange, setDisplayRange] = useState(false);
  const theme = useTheme();
  const blue500 = theme.colors.blue[600]; // Get the value of "blue.500"

  useEffect(() => {}, []);
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
    });
    setRange([1, videoRef.current.duration]);
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

  const onChangeStart = () => {
    // Optional: Pause the video while dragging
    if (videoRef.current) videoRef.current.pause();
  };

  const onChange = (values) => {
    const startValue = values[0];
    const endValue = values[1];

    if (
      Math.abs(startValue - range[0]) < STEP &&
      Math.abs(endValue - range[1]) < STEP
    ) {
      return;
    }

    if (startValue != range[0]) {
      videoRef.current.currentTime = startValue;
    } else {
      videoRef.current.currentTime = endValue;
    }
    setRange(values);
  };

  const onChangeEnd = () => {
    if (videoRef.current) {
      //   console.log("ENDED");
      videoRef.current.currentTime = range[0];
      videoRef.current.play();
    }
  };

  const handleClickPlay = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      return;
    }
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const onMouseEnterVideo = () => {
    setDisplayRange(true);
  };

  const onMouseLeaveVideo = () => {
    setDisplayRange(false);
  };

  const handleTrackClick = (e) => {
    e.stopPropagation(); // Prevent the default click behavior
    e.preventDefault();
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

      <Box
        display="flex"
        backgroundColor="rgba(255, 255, 255, 0.6)"
        p={6}
        position="absolute"
        flexDirection="row"
        // width="100%"
        bottom="50px"
        left="50px"
        right="50px"
        borderRadius="md"
        style={{
          opacity: displayRange ? 1 : 0, // Animate opacity
          transition: "opacity 0.3s ease-in-out", // Smooth transition
          pointerEvents: displayRange ? "auto" : "none", // Disable interaction when hidden
        }}
      >
        <Box
          marginRight={6}
          //   width="100px"
          //   width="100%"
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
        <RangeSlider
          //   isDisabled={true}
          onChangeStart={onChangeStart}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
          aria-label={["min", "max"]}
          // max={18}
          // min={1}
          step={STEP}
          value={range}
          //   onClick={handleTrackClick}
          // onMouseDown={}

          // minStepsBetweenThumbs={3}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Box>
      <Box
        style={{
          opacity: displayRange ? 1 : 0, // Animate opacity
          transition: "opacity 0.3s ease-in-out", // Smooth transition
          pointerEvents: displayRange ? "auto" : "none", // Disable interaction when hidden
        }}
        position="absolute"
        right="50px"
        top="50px"
      >
        <Button onClick={handleCut}>
          <RxScissors />
        </Button>
      </Box>
    </Box>
  );
};

const VideoEditor = () => {
  const [videoClips, setVideoClips] = useState([]);

  useEffect(() => {}, []);

  const saveVideoCut = (clip) => {
    clip.idx = videoClips.length;
    setVideoClips([...videoClips, clip]);
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
      {videoClips.length > 0 && <VideoClipsList videoClips={videoClips} />}
    </Box>
  );
};

const VideoDashboard = () => {
  //   const [videoClips, setVideoClips] = useState([]);

  //   useEffect(() => {}, []);
  //   const handleCut = () => {
  //     const startTime = range[0];
  //     let endTime = range[1];
  //     if (endTime > videoRef?.current.duration) {
  //       endTime = videoRef?.current.duration;
  //     }
  //     saveVideoCut({
  //       src: videoURL,
  //       startTime,
  //       endTime,
  //     });
  //     setRange([1, videoRef.current.duration]);
  //   };

  return (
    <Box flex={1} display="flex" justifyContent={"center"}>
      <Tabs
        isLazy
        display="flex"
        flexDirection="column"
        flex={1}
        width="100%"
        maxW="1000px"
        variant="unstyled"
      >
        <TabList>
          <Tab
            _selected={{
              fontWeight: "bold",
              borderBottom: "none", // Remove any underline if it persists
            }}
          >
            Cut
          </Tab>
          <Tab
            _selected={{
              fontWeight: "bold",
              borderBottom: "none", // Remove any underline if it persists
            }}
          >
            Edit
          </Tab>
          <Tab
            _selected={{
              fontWeight: "bold",
              borderBottom: "none", // Remove any underline if it persists
            }}
          >
            Preview
          </Tab>
        </TabList>

        <TabPanels display="flex" flex={1}>
          <TabPanel display="flex" p={0} flex={1}>
            <VideoEditor />
          </TabPanel>
          {/* <TabPanel display="flex" flex={1}>
            <PreviewVideo />
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default VideoDashboard;
