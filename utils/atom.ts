import { atom } from "recoil";
import { IModal } from "@/types/modal";
import { v1 } from "uuid";

export const modalState = atom<IModal>({
  key: `modalState/${v1()}`,
  default: {
    isOpen: false,
    modalType: "",
    btnName: [""],
    content: "",
  },
});
