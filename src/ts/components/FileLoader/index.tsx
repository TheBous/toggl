import React, { FC, ChangeEvent } from "react";

import { IFileLoaderProps } from "./index.d";

const FileLoader: FC<IFileLoaderProps> = ({
  setFiles,
  setError,
}): JSX.Element => {
  const onFilesChange = async (e?: ChangeEvent): Promise<void> => {
    if (!e) return;
    e.preventDefault();

    const eventTarget = e.target as HTMLInputElement;
    const allFiles = Array.from(eventTarget?.files as FileList);
    if (!!allFiles && !!allFiles.length) setFiles(allFiles as File[]);
  };

  return <input onChange={onFilesChange} type="file" multiple accept=".txt" />;
};

export default FileLoader;
