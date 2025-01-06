import { Toast } from "primereact/toast";

export const enum NotificationType {
  error = "error",
  success = "success",
  secondary = "secondary",
  info = "info",
  contrast = "contrast",
  warn = "warn",
}

export type TNotificationType = keyof typeof NotificationType;
export type TToastClearFn = Toast["clear"];
export type TToastRemoveFn = Toast["remove"];
export type TToastReplaceFn = Toast["replace"];
export type TToastShowFn = Toast["show"];

export type TNotificationProvider = {
  clear?: TToastClearFn;
  remove?: TToastRemoveFn;
  show?: TToastShowFn;
};
