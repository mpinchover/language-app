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
import VideoEditor from "./video-editor";
import { FaPause, FaPlay } from "react-icons/fa";
import { useTheme } from "@chakra-ui/react";
import { videoClipsStore } from "../../recoil/video";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const VideoDashboard = () => {
  useEffect(() => {}, []);

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
