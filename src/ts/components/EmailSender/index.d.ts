import { Notification } from "../CustomNotification/index.d";

export interface IEmailSenderProps {
  files: File[] | null;
  clearStatus: () => void;
  setNotification: (notification: Notification) => void;
}
