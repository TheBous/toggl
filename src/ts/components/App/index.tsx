import React, { FC, useState } from "react";
import FileLoader from "../FileLoader";
import EmailSender from "../EmailSender";
import CustomError from "../CustomError";

const App: FC = (): JSX.Element => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [error, setError] = useState<string>("");

  const clearStatus = (): void => {
    setFiles([]);
  };

  return (
    <div data-testid="container" className="toggl-container">
      <FileLoader setFiles={setFiles} setError={setError} />
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
