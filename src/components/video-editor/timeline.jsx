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

const STEP = 0.25;

const Timeline = () => {
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

  const onChangeStart = () => {
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
      videoRef.current.currentTime = range[0];
      videoRef.current.play();
      setIsPlaying(true);
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

  return (
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
  );
};
export default Timeline;
