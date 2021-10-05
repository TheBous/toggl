import React, { FC } from "react";
import cx from "classnames";

import { ICustomNotificationProps } from "./index.d";

import "./index.scss";

const CustomNotification: FC<ICustomNotificationProps> = ({
  notification: { label, isError },
  setNotification,
}): JSX.Element | null => {
  if (!label) return null;
  return (
    <div className={cx("notification", { "--error": isError })}>
      <span className="__label">{label}</span>
      <span
        className="__close"
        role="button"
        onClick={() => setNotification({ label: "", isError: false })}
      >
        ❌
      </span>
    </div>
  );
};

export default CustomNotification;
