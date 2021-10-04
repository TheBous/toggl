import React, { FC, useState, useRef } from "react";
import FileLoader from "../FileLoader";
import EmailSender from "../EmailSender";
import CustomNotification from "../CustomNotification";
import FilesInfo from "../FilesInfo";

import "../../../scss/index.scss";

const App: FC = (): JSX.Element => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [notification, setNotification] = useState({
    label: "",
    isError: false,
  });
  const fileLoaderRef = useRef<HTMLInputElement>(null);

  const clearStatus = (): void => {
    setFiles([]);
    if (fileLoaderRef.current) {
      fileLoaderRef.current.value = "";
    }
  };

  return (
    <div data-testid="container" className="toggl-container">
      <FileLoader setFiles={setFiles} inputRef={fileLoaderRef} />
      <FilesInfo files={files} />
      <EmailSender
        files={files}
        clearStatus={clearStatus}
        setNotification={setNotification}
      />
      <CustomNotification
        notification={notification}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
