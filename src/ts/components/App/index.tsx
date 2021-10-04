import React, { FC, useState, useRef } from "react";
import FileLoader from "../FileLoader";
import EmailSender from "../EmailSender";
import CustomError from "../CustomError";
import FilesInfo from "../FilesInfo";

import "../../../scss/index.scss";

const App: FC = (): JSX.Element => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [error, setError] = useState<string>("");
  const fileLoaderRef = useRef<HTMLInputElement>(null);

  const clearStatus = (): void => {
    setFiles([]);
    setError("");
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
        setError={setError}
      />
      <CustomError error={error} />
    </div>
  );
};

export default App;
