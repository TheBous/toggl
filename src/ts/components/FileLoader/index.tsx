import React, { FC, ChangeEvent, DragEvent, useState } from "react";
import cx from "classnames";

import { IFileLoaderProps } from "./index.d";

import "./index.scss";

const FileLoader: FC<IFileLoaderProps> = ({
  setFiles,
  files,
  inputRef,
}): JSX.Element => {
  const [isInDropzone, setDropzone] = useState<boolean>(false);
  const mergeFiles = (newFiles: File[]): void => {
    if (!!newFiles && !!newFiles.length) {
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDropzone(true);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDropzone(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDropzone(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dndFiles: File[] = [...e.dataTransfer.files];
    if (dndFiles) {
      setDropzone(false);
      mergeFiles(dndFiles);
    }
  };

  const onFilesChange = async (e?: ChangeEvent): Promise<void> => {
    if (!e) return;
    e.preventDefault();

    const eventTarget = e.target as HTMLInputElement;
    const allFiles = Array.from(eventTarget?.files as FileList);
    mergeFiles(allFiles);
  };

  return (
    <div
      className={cx("file-loader", { "--dropzone": isInDropzone })}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <label className="__label" htmlFor="file">
        🗄️ 📁 🗂️
      </label>
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
