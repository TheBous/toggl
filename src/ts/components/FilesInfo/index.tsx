import React, { FC, useEffect, useState } from "react";

import { IFilesInfoProps } from "./index.d";

import { readAndFormatFile } from "../../helpers/file";

import "./index.scss";

interface IFormattedFilesInfo {
  file: File;
  lines: number;
}

const FileLoader: FC<IFilesInfoProps> = ({ files }): JSX.Element | null => {
  const [fileInfos, setFileInfos] = useState<IFormattedFilesInfo[]>([]);

  useEffect(() => {
    if (!files || !files.length) {
      setFileInfos([]);
    } else {
      files.forEach(async (file) => {
        const formattedInfos = {
          file,
          lines: (await readAndFormatFile(file)).length,
        };
        setFileInfos((oldFileInfo) => oldFileInfo.concat(formattedInfos));
      });
    }
  }, [files.length]);

  if (!fileInfos || !fileInfos.length) return null;
  return (
    <ul className="file-info">
      {fileInfos.map(({ file, lines }: IFormattedFilesInfo, index: number) => {
        return (
          <li key={`${file}_${index}`}>
            {file?.name} ({lines})
          </li>
        );
      })}
    </ul>
  );
};

export default FileLoader;
