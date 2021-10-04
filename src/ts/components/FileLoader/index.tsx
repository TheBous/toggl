import React, { FC, ChangeEvent } from "react";

import { IFileLoaderProps } from "./index.d";

import "./index.scss";

const FileLoader: FC<IFileLoaderProps> = ({
  setFiles,
  inputRef,
}): JSX.Element => {
  const onFilesChange = async (e?: ChangeEvent): Promise<void> => {
    if (!e) return;
    e.preventDefault();

    const eventTarget = e.target as HTMLInputElement;
    const allFiles = Array.from(eventTarget?.files as FileList);
    if (!!allFiles && !!allFiles.length) setFiles(allFiles as File[]);
  };

  return (
    <div className="file-loader">
      <label className="__label" htmlFor="file" >🗄️ 📁 🗂️</label>
      <input
        id="file"
        className="__file"
        onChange={onFilesChange}
        type="file"
        multiple
        accept=".txt"
        ref={inputRef}
      />
    </div>
  );
};

export default FileLoader;
