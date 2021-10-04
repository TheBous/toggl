import React, { FC, useState } from "react";
import cx from "classnames";

import { IEmailSenderProps } from "./index.d";

import "./index.scss";

const EmailSender: FC<IEmailSenderProps> = ({
  files,
  clearStatus,
  setError,
}): JSX.Element | null => {
  const [loading, setLoading] = useState<boolean>(false);
  if (!files || !files.length) return null;

  const endpoint = "https://toggl-hire-frontend-homework.vercel.app/api/send";
  const readFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(file);
    });
  };

  const sendEmails = async (): Promise<void> => {
    try {
      setLoading(true);
      const pendingEmails: Promise<string[]>[] = await files?.map(
        async (file) => {
          const fileContents = (await readFile(file)) as string;
          const formattedFileContents: string = fileContents.replace(/\n$/, "");
          return formattedFileContents.split("\n");
        }
      );
      const emails: string[] = (await Promise.all(pendingEmails)).flat();
      const body = JSON.stringify({
        emails,
      });
      const response = await fetch(endpoint, {
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
      clearStatus();
      setLoading(false);
    } catch ({ message }) {
      setLoading(false);
      setError(message as string);
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
