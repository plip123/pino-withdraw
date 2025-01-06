import { useContext, useRef, createContext, ReactNode } from "react";
import type {
  TNotificationProvider,
  TToastClearFn,
  TToastRemoveFn,
  TToastShowFn,
} from "./useNotifications.interface";
import { isMobile } from "react-device-detect";
import { Toast } from "primereact/toast";

interface INotificationProvider {
  children: ReactNode;
}

/* Default Values */
const defaultValues: TNotificationProvider = {
  clear: () => {},
  remove: () => {},
  show: () => {},
};

/* Context */
// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext =
  createContext<TNotificationProvider>(defaultValues);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationProvider = () => useContext(NotificationContext);

/* Provider */
export const NotificationProvider = ({ children }: INotificationProvider) => {
  const toast = useRef<Toast>(null);

  const clear: TToastClearFn = () => {
    if (!toast.current) return;
    toast.current.clear();
  };

  const remove: TToastRemoveFn = (message) => {
    if (!toast.current) return;
    toast.current.remove(message);
  };

  const show: TToastShowFn = (message) => {
    if (!toast.current) return;
    toast.current.show(message);
  };

  return (
    <NotificationContext.Provider
      value={{
        ...defaultValues,
        clear,
        remove,
        show,
      }}
    >
      <Toast ref={toast} position={isMobile ? "top-center" : "bottom-right"} />
      {children}
    </NotificationContext.Provider>
  );
};
