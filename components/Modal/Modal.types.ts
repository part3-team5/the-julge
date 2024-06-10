export interface IModal {
  isOpen: boolean;
  modalType: "" | "alert" | "warning" | "select";
  content: JSX.Element | string;
  btnName: [string, string?];
  callBackFnc?: () => any | Promise<any>;
}

export interface IModalProps {
  modalType: "" | "alert" | "warning" | "select";
  content: JSX.Element | string;
  btnName: [string, string?];
  callBackFnc?: () => any | Promise<any>;
}

export interface IModalContentProps {
  modalData: IModalProps;
  closeFunction: () => any;
}
