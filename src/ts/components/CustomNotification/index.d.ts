export interface Notification {
    label: string;
    isError: boolean;
}

export interface ICustomNotificationProps {
    notification: Notification;
    setNotification: (notification: Notification) => void;
}