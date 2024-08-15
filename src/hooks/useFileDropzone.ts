import { useDropzone as useReactDropzone } from "react-dropzone";

export enum ErrorCode {
  FileInvalidType = "file-invalid-type",
  FileTooLarge = "file-too-large",
  FileTooSmall = "file-too-small",
  TooManyFiles = "too-many-files",
}

export interface FileError {
  message: string;
  code: ErrorCode | string;
}

export type FileRejection = {
  file: File;
  errors: FileError[];
};

export type DropEvent =
  | React.DragEvent<HTMLElement>
  | React.ChangeEvent<HTMLInputElement>
  | DragEvent
  | Event;

export type UseFileDropzoneOptions = Pick<
  React.HTMLProps<HTMLElement>,
  "multiple" | "onDragEnter" | "onDragOver" | "onDragLeave"
> & {
  accept?: Record<string, string[]>;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  preventDropOnDocument?: boolean;
  noClick?: boolean;
  noKeyboard?: boolean;
  noDrag?: boolean;
  noDragEventsBubbling?: boolean;
  disabled?: boolean;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
  onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
  onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
  getFilesFromEvent?: (
    event: DropEvent,
  ) => Promise<Array<File | DataTransferItem>>;
  onFileDialogCancel?: () => void;
  onFileDialogOpen?: () => void;
  onError?: (err: Error) => void;
  validator?: <T extends File>(file: T) => FileError | FileError[] | null;
  useFsAccessApi?: boolean;
  autoFocus?: boolean;
};

export interface DropzoneRootProps extends React.HTMLAttributes<HTMLElement> {
  refKey?: string;
  [key: string]: unknown;
}

export interface DropzoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  refKey?: string;
}

type UseFileDropzoneReturn = {
  isFocused: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  isFileDialogActive: boolean;
  acceptedFiles: File[];
  fileRejections: FileRejection[];
  rootRef: React.RefObject<HTMLElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
};

function useFileDropzoneImpl(
  options: UseFileDropzoneOptions,
): UseFileDropzoneReturn {
  const props = useReactDropzone(options);

  return {
    isFocused: props.isFocused,
    isDragActive: props.isDragActive,
    isDragAccept: props.isDragAccept,
    isDragReject: props.isDragReject,
    isFileDialogActive: props.isFileDialogActive,
    acceptedFiles: props.acceptedFiles,
    fileRejections: props.fileRejections,
    rootRef: props.rootRef,
    inputRef: props.inputRef,
    getRootProps: props.getRootProps,
    getInputProps: props.getInputProps,
  };
}

export function useFileDropzone(
  options: UseFileDropzoneOptions,
): UseFileDropzoneReturn {
  return useFileDropzoneImpl(options);
}
