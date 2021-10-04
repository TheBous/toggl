import React, { FC } from "react";

import { IEmailSenderProps } from "./index.d";

const EmailSender: FC<IEmailSenderProps> = ({
  files,
  clearStatus,
  setError,
}): JSX.Element | null => {
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
      const pendingEmails: Promise<string[]>[] = await files?.map(async (file) => {
        const fileContents = (await readFile(file)) as string;
        const formattedFileContents: string = fileContents.replace(/\n$/, "");
        return formattedFileContents.split("\n");
      });
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
    } catch ({ message }) {
      setError(message as string);
    }
    return;
  };

  return (
    <div className="email-sender">
      <button onClick={sendEmails}>Send emails</button>
    </div>
  );
};

export default EmailSender;
