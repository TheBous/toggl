import React, { FC } from "react";

import { IFilesInfoProps } from "./index.d";

import "./index.scss";

const FileLoader: FC<IFilesInfoProps> = ({ files }): JSX.Element | null => {
  if (!files || !files.length) return null;
  return (
    <ul className="file-info">
      {files.map((file: File, index: number) => (
        <li key={`${file}_${index}`}>{file?.name}</li>
      ))}
    </ul>
  );
};

export default FileLoader;
