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

const Timeline = ({ displayRange, videoRef, duration, range, setRange }) => {
  //   const videoRef = useRef(null);
  const sliderRef = useRef(null); // Ref for the input slider
  //   const [duration, setDuration] = useState(0);
  //   const [range, setRange] = useState([0, 0]);
  const [overlays, setOverlays] = useState([]);
  //   const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [newOverlay, setNewOverlay] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [minValue, setMinValue] = useState(0); // Left thumb value
  const [maxValue, setMaxValue] = useState(duration); // Right thumb value
  const [isDragging, setIsDragging] = useState(null); // Tracks which thumb is being dragged

  //   const [displayRange, setDisplayRange] = useState(false);
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

  const handleMouseMove = (e) => {
    if (isDragging === null) return;

    // Get the bounding box of the slider container
    const sliderRect = e.target
      .closest(".slider-container")
      .getBoundingClientRect();

    // Calculate the percentage of the click's horizontal position within the slider
    const percentage = Math.max(
      0,
      Math.min(1, (e.clientX - sliderRect.left) / sliderRect.width)
    );

    // Map percentage to a range value and round to the nearest step
    const value = Math.round((percentage * duration) / STEP) * STEP;

    if (isDragging === "min" && value < maxValue) {
      setMinValue(value);
    } else if (isDragging === "max" && value > minValue) {
      setMaxValue(value);
    }
    videoRef.current.currentTime = value;
    setRange([minValue, maxValue]);
  };

  const handleMouseUp = () => {
    if (isDragging === null) return;

    // Trigger onChangeEnd here if necessary
    console.log("onChangeEnd:", { minValue, maxValue });
    setIsDragging(null); // Reset drag state
  };

  const handleThumbMouseDown = (thumb) => {
    setIsDragging(thumb);

    // Trigger onChangeStart here if necessary
    console.log("onChangeStart:", { minValue, maxValue });
  };

  // Update the border width dynamically based on the thumbs' positions
  const leftPercentage = (minValue / duration) * 100;
  const rightPercentage = (maxValue / duration) * 100;

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
      //   p={6}
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
      <Box
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="slider-container"
        position="relative"
        borderRadius="md"
        h="60px"
        border="solid 1px red"
        width="full"
      >
        <Box
          position="absolute"
          top="0"
          bottom="0"
          bg="red.500"
          left={`${leftPercentage}%`}
          right={`${100 - rightPercentage}%`}
          zIndex={1}
          borderRadius="md"
        />
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
        ></Button>
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
        ></Button>
      </Box>
    </Box>
  );
};
export default Timeline;

/*

      {/* <RangeSlider
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
      */
