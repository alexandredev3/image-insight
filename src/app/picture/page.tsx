"use client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useAtomValue } from "jotai";

import { AppConainer } from "../_components";
import { uploadedFileAtom } from "../(upload-picture)/uploaded-file-atom";
import { cn, getFileURL } from "~/utils";
import { Button, RadioGroup, Tooltip } from "~/components/ui";
import { IMAGE_TYPES, type ImageTypes } from "./image-types";

export default function PictureType() {
  const uploadedFile = useAtomValue(uploadedFileAtom);
  const [selectedImageType, setSelectedImageType] =
    useState<ImageTypes>("professional");
  const router = useRouter();

  if (!uploadedFile) {
    return redirect("/");
  }

  function handleSubmit() {
    router.push(`/picture/${selectedImageType}`);
  }

  return (
    <AppConainer>
      <h1 className="text-xl">What is your picture type?</h1>
      <div className="mt-2 flex gap-4">
        <Image
          src={getFileURL(uploadedFile)}
          width={500}
          height={500}
          objectFit=""
          alt="Uploaded image"
          className="rounded-md object-cover"
        />
        <div>
          <RadioGroup>
            <ul className="grid w-full max-w-[520px] grid-cols-4 gap-4">
              <Tooltip.Provider delayDuration={0}>
                {IMAGE_TYPES.map(({ name, value, description }) => (
                  <li key={value}>
                    <Tooltip>
                      <Tooltip.Trigger asChild>
                        <Button
                          variant="outline"
                          className={cn("flex items-center gap-2", {
                            "bg-accent-primary text-surface-primary":
                              selectedImageType === value,
                          })}
                          onClick={() => setSelectedImageType(value)}
                        >
                          <span
                            className={cn(
                              "text-accent-primary group-hover:text-surface-primary",
                              {
                                "text-surface-primary":
                                  selectedImageType === value,
                              },
                            )}
                          >
                            {name}
                          </span>
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{description}</Tooltip.Content>
                    </Tooltip>
                  </li>
                ))}
              </Tooltip.Provider>
            </ul>
          </RadioGroup>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Button onClick={() => router.back()}>Back</Button>
        <Button onClick={handleSubmit}>Get a Feeback!</Button>
      </div>
    </AppConainer>
  );
}
