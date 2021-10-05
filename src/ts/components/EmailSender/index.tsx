import React, { FC, useState } from "react";
import cx from "classnames";

import { IEmailSenderProps } from "./index.d";

import { readAndFormatFile } from "../../helpers/file";

import "./index.scss";

const EmailSender: FC<IEmailSenderProps> = ({
  files,
  clearStatus,
  setNotification,
}): JSX.Element | null => {
  const [loading, setLoading] = useState<boolean>(false);
  if (!files || !files.length) return null;

  const endpoint = "https://toggl-hire-frontend-homework.vercel.app";

  const sendEmails = async (): Promise<void> => {
    try {
      setLoading(true);
      const pendingEmails: Promise<string[]>[] = await files?.map(
        async (file) => readAndFormatFile(file)
      );
      const emails: string[] = (await Promise.all(pendingEmails)).flat();
      const body = JSON.stringify({
        emails,
      });
      const response = await fetch(`${endpoint}/api/send`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (response.status !== 200) {
        const { emails: errorEmails = [] } = await response.json();
        throw new Error(`Error with mails ${errorEmails.join(", ")}`);
      }
      setLoading(false);
      setNotification({
        label: String.fromCodePoint(128512),
        isError: false,
      });
    } catch ({ message }) {
      setLoading(false);
      setNotification({
        label: message as string,
        isError: true,
      });
    } finally {
      clearStatus();
    }
    return;
  };

  const classnames = "__action";
  if (loading) classnames.concat(" --loading");

  return (
    <div className="email-sender">
      <button
        className={cx("__action", { "--loading": loading })}
        onClick={sendEmails}
      >
        <span>📤</span>
      </button>
    </div>
  );
};

export default EmailSender;
