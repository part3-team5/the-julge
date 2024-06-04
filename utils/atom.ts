import { atom } from "recoil";
import { IModal } from "@/components/Modal/Modal.types";
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
