import { atom } from "recoil";

export const employerAtom = atom({
  key: "employerAtom",
  default: {
    id: "",
    email: "",
    type: "",
    shopId: "",
  },
});
