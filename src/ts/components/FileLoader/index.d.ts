export interface IFileLoaderProps {
    setFiles: (updatedEmail: File[]) => void;
    inputRef: RefObject<HTMLInputElement>;
}