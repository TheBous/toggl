export interface IFileLoaderProps {
    setFiles: (updatedFile: File[]) => void;
    files: File[];
    inputRef: RefObject<HTMLInputElement>;
}