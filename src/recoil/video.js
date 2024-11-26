import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const videoClipsStore = atom({
  key: "videoClipsStoreState",
  default: [],
});
