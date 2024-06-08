import { atom } from "recoil";

const employerAtomKey = "employerAtom";

export const employerAtom = atom({
  key: employerAtomKey,
  default: {
    id: "",
    email: "",
    type: "",
    shopId: "",
  },
});
