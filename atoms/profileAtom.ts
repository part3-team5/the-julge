import { atom } from "recoil";

export const profileAtom = atom({
  key: "profileAtom",
  default: {
    name: "",
    phone: "",
    area: "",
    bio: "",
  },
});
