import { atom } from "recoil";
import { ProfileData } from "../Profile.types";

export const profileDataState = atom<ProfileData | null>({
  key: "profileDataState",
  default: null,
});
