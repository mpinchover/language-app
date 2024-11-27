import { Box } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
// import VideoClipPlayer from "./video-clip";
import { videoClipsStore } from "../../recoil/video";

const VideoPreview = () => {
  const [vidIndex, setVidIndex] = useState(0);
  const videoClips = useRecoilValue(videoClipsStore);
  const videoRef = useRef(null);

  const [range, setRange] = useState([
    videoClips[vidIndex]?.startTime,
    videoClips[vidIndex]?.endTime,
  ]);

  useEffect(() => {
    // Update the range each time vidIndex changes
    setRange([videoClips[vidIndex]?.startTime, videoClips[vidIndex]?.endTime]);
  }, [vidIndex, videoClips]);

  const handleTimeUpdate = (e) => {
    const video = videoRef.current;
    if (video.currentTime >= range[1]) {
      if (videoClips.length === 1) {
        video.currentTime = range[0];
      } else {
        setVidIndex((prev) => {
          const newIndex = prev + 1;
          return newIndex >= videoClips.length ? 0 : newIndex;
        });
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    console.log("Loaded metadata for vid", vidIndex);
    console.log("range is ", range); // This will now reflect the updated range
    video.currentTime = range[0];
    video.play();
  };

  console.log("VIDEO CLIPS ARE ", videoClips);

  if (!videoClips || videoClips.length === 0) return null;

  return (
    <Box
      backgroundColor="black"
      display={"flex"}
      flex={1}
      //   border="1px solid green"
      justifyContent={"center"}
      alignItems="center"
    >
      <video
        display="flex"
        flex={1}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        key={vidIndex}
        // muted={true}
        autoPlay={true}
        ref={videoRef}
        // width="70%"
        // height={"500px"}
        // width={"500px"}
        src={videoClips[vidIndex].src}
        muted
        style={{
          height: "100%",

          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default VideoPreview;
