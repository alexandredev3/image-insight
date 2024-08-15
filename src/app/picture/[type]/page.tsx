"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useAtomValue } from "jotai";

import { AppConainer } from "~/app/_components";
import { uploadedFileAtom } from "~/app/(upload-picture)/uploaded-file-atom";
import { type ImageTypes } from "../image-types";
import { Button, Skeleton } from "~/components/ui";
import { getFileURL } from "~/utils";
import { api } from "~/trpc/react";

export default function PictureType({
  params,
}: {
  params: { type: ImageTypes };
}) {
  const router = useRouter();
  const uploadedFile = useAtomValue(uploadedFileAtom);
  const feedback = api.chat.feedback.useMutation();

  useEffect(() => {
    if (!uploadedFile || !params?.type) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      if (reader.result) {
        feedback.mutate({
          file: reader.result as string,
          type: params.type,
        });
      }
    };
    reader.readAsDataURL(uploadedFile);
  }, [params.type, uploadedFile]);

  if (!params?.type || !uploadedFile) {
    return redirect("/");
  }

  return (
    <AppConainer>
      <h1 className="text-xl">{"Here's"} your feedback!</h1>
      <div className="mt-2 flex gap-4">
        <Image
          src={getFileURL(uploadedFile)}
          width={500}
          height={500}
          objectFit=""
          alt="Uploaded image"
          className="rounded-md object-cover"
        />
        {feedback.isPending ? (
          <Skeleton className="h-[400px] w-full" />
        ) : (
          <div className="h-[400px] overflow-auto rounded-md bg-surface-primary p-6">
            <p>{feedback.data?.result}</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        <Button onClick={() => router.push("/")}>Try another image</Button>
      </div>
    </AppConainer>
  );
}
