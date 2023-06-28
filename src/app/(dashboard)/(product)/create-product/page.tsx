"use client";

import { DocsPageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useShadowDrive } from "@/hooks/useShadowDrive";
import { useAppState } from "@/store/app-state";

import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CreateProduct() {
  const wallet = useWallet();
  const { connection } = useConnection();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const storageAccounts = useAppState(
    (state) => state.storageAccounts
  );

  const {
    drive,
    getOrCreateStorageAccountByName,
    findUrlByFileName,
    getStorageAccountWithName,
  } = useShadowDrive(wallet, connection);

  const { back } = useRouter();

  const [files, setFiles] = useState<any>([]);

  const handleSubmit = () => {
    const productName = nameRef.current?.value;
    const productDescription =
      descriptionRef.current?.value;

    // Upload the file to Shadow drive.

    // Then save this product into a db for this user.
  };

  return (
    <div className="mx-auto container">
      <DocsPageHeader heading="Create a Product" />

      <Card>
        <CardHeader></CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of the product..."
              ref={nameRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your product in detail here..."
              ref={descriptionRef}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">
              Upload files here
            </Label>
            <Input
              multiple
              id="picture"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between space-x-2">
          <Button
            variant="ghost"
            onClick={() => {
              back();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
