"use client";
import Link from "next/link";
import { useAtomValue } from "jotai";

import { FileDropzone } from "./file-dropzone";
import { Button } from "~/components/ui";
import { cn } from "~/utils";
import { AppConainer } from "../_components";
import { uploadedFileAtom } from "./uploaded-file-atom";

export default function Home() {
  const uploadedFile = useAtomValue(uploadedFileAtom);

  return (
    <AppConainer>
      <h1 className="text-xl">Upload an image</h1>
      <p className="mt-1">Upload an image to get started</p>
      <FileDropzone />
      <Button
        className={cn("mt-4 w-full max-w-[124px] self-end", {
          "bg-purple-500/50 hover:bg-purple-500/50": !uploadedFile,
        })}
        asChild
        disabled={!uploadedFile}
      >
        <Link href={`/picture`}>Get Started</Link>
      </Button>
    </AppConainer>
  );
}
