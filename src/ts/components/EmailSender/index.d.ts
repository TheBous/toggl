export interface IEmailSenderProps {
    files: File[]|null;
    clearStatus: () => void;
    setError: (error: string) => void;
}