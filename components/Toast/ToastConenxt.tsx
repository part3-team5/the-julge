import Toast from "@/components/Toast/Toast";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ShowToastType = (message: string) => void;
interface ToastContextType {
  showToast: ShowToastType;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 내부에서 사용해야 합니다");
  }
  return context;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastVisible && <Toast message={toastMessage} />}
    </ToastContext.Provider>
  );
}
