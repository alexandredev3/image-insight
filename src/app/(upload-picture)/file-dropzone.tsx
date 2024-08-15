"use client";
import { useCallback, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";

import { type FileRejection, useFileDropzone } from "~/hooks";
import { cn, getFileURL } from "~/utils";
import { uploadedFileAtom } from "./uploaded-file-atom";

const ACCEPT_IMAGE_MIMES = [".png", ".jpg", ".jpeg", ".webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function FileDropzone() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useAtom(uploadedFileAtom);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setIsDragActive(false);
      setIsDraggingOver(false);
      const droppedFile = acceptedFiles?.[0];
      if (droppedFile) {
        setUploadedFile(droppedFile);
      }
    },
    [setUploadedFile],
  );

  const { getRootProps, getInputProps } = useFileDropzone({
    accept: {
      "image/png": ACCEPT_IMAGE_MIMES,
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDragEnter: () => {
      setIsDragActive(true);
    },
    onDragLeave: () => {
      setIsDragActive(false);
      setIsDraggingOver(false);
    },
    onDrop,
    onDragOver: () => setIsDraggingOver(true),
    onError: (error) => {
      console.error(error);
    },
  });

  function handleRemoveUploadedFile() {
    setUploadedFile(undefined);
  }

  const uploadedFileURL = uploadedFile ? getFileURL(uploadedFile) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div
        className={cn(
          `relative mt-4 flex h-[300px] w-full flex-col items-center justify-center rounded-md py-8`,
          {
            "border-transparent": uploadedFileURL,
            "bg-purple-500/20": isDraggingOver,
          },
        )}
        role="presentation"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23AB68FFFF' stroke-width='3' stroke-dasharray='8%2c 18' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
        {...getRootProps()}
      >
        <input id="file" type="file" className="hidden" {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <svg
            width="42"
            height="28"
            viewBox="0 0 42 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn({
              "animate-bounce": isDragActive,
            })}
          >
            <path
              d="M33.8625 10.57C32.6725 4.5325 27.37 0 21 0C15.9425 0 11.55 2.87 9.3625 7.07C4.095 7.63 0 12.0925 0 17.5C0 23.2925 4.7075 28 10.5 28H33.25C38.08 28 42 24.08 42 19.25C42 14.63 38.4125 10.885 33.8625 10.57ZM33.25 24.5H10.5C6.6325 24.5 3.5 21.3675 3.5 17.5C3.5 13.9125 6.1775 10.92 9.73 10.5525L11.6025 10.36L12.4775 8.6975C14.14 5.495 17.395 3.5 21 3.5C25.585 3.5 29.54 6.755 30.4325 11.2525L30.9575 13.8775L33.635 14.07C36.365 14.245 38.5 16.5375 38.5 19.25C38.5 22.1375 36.1375 24.5 33.25 24.5ZM14 15.75H18.4625V21H23.5375V15.75H28L21 8.75L14 15.75Z"
              className="fill-accent-primary"
            />
          </svg>

          {isDragActive ? (
            <h2 className="mt-3 font-medium">Drop the file here</h2>
          ) : (
            <h2 className="mt-3 font-medium">
              Drag your file(s) or{" "}
              <label htmlFor="file">
                <button
                  className="text-base text-accent-primary"
                  disabled={isDragActive}
                >
                  browser
                </button>
              </label>
            </h2>
          )}
          <p className="mt-2 text-gray-200">
            Max {MAX_FILE_SIZE / 1024 / 1024} MB files are allowed
          </p>
        </div>
      </div>
      <p>Only support {ACCEPT_IMAGE_MIMES.join(", ")} files</p>
      {uploadedFileURL && (
        <ul>
          <li>
            <div className="rounded-md border border-gray-500">
              <div className="flex justify-between p-2">
                <div className="flex items-center gap-2">
                  <Image
                    width={72}
                    height={72}
                    objectFit="contain"
                    src={uploadedFileURL}
                    alt="Uploaded Image Preview"
                    className="rounded-md"
                  />
                  <span>{uploadedFile?.name}</span>
                </div>

                <button
                  type="button"
                  aria-label="Click to remove the uploaded image"
                  onClick={handleRemoveUploadedFile}
                  className="transition-opacity hover:opacity-80"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      d="M12 4C7.59 4 4 7.59 4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4ZM16 14.59L14.59 16L12 13.41L9.41 16L8 14.59L10.59 12L8 9.41L9.41 8L12 10.59L14.59 8L16 9.41L13.41 12L16 14.59Z"
                      fill="#858585"
                    />
                    <path
                      d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                      fill="#858585"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
