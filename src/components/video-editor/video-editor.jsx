import {
  Box,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  RangeSlider,
  RangeSliderFilledTrack,
  Button,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { RxScissors } from "react-icons/rx";

const CutClips = () => {
  return <Box></Box>;
};

const STEP = 0.25;
const videoURL =
  "https://storage.googleapis.com/video-editor-uploads/demo_1.mp4";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const sliderRef = useRef(null); // Ref for the input slider
  const [duration, setDuration] = useState(0);
  const [range, setRange] = useState([0, 19]);
  const [overlays, setOverlays] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [newOverlay, setNewOverlay] = useState(null);

  const [videoClips, setVideoClips] = useState([]);
  const [displayRange, setDisplayRange] = useState(false);

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
      setDuration(Math.floor(video.duration));
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
      return;
    }
    videoRef.current.pause();
  };

  const handleCut = () => {
    const startTime = range[0];
    const endTime = range[1];
    // saveVideoCut({
    //   src: videoURL,
    //   startTime,
    //   endTime,
    // });
    // setRange(1, videoRef.current.duration);
  };

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
      width="1000px"
      maxW="1000px" // Limits the parent Box to 1000px
    >
      <video
        ref={videoRef}
        src={videoURL}
        loop
        muted
        style={{
          width: "100%",

          objectFit: "contain",
        }}
      />

      <Box
        backgroundColor="rgba(255, 255, 255, 0.6)"
        p={6}
        position="absolute"
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
        <RangeSlider
          // on
          // onDragStart={onChange}
          onChangeStart={onChangeStart}
          // onChangeStart={onChangeStart}
          onChange={onChange}
          onChangeEnd={onChangeEnd}
          aria-label={["min", "max"]}
          // defaultValue={range}

          // max={18}
          // min={1}
          step={STEP}
          value={range}

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
        <Button>
          <RxScissors />
        </Button>
      </Box>
    </Box>
  );
};

const VideoEditor = () => {
  return (
    <Box flex={1} display="flex" justifyContent={"center"} alignItemms="center">
      <VideoPlayer />
    </Box>
  );
};

export default VideoEditor;
