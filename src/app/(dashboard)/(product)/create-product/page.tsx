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
import { useToast } from "@/components/ui/use-toast";
import {
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ToastAction } from "@radix-ui/react-toast";
import { insertProduct } from "@/db/helpers";
import { NewProduct } from "@/db/schema";

export default function CreateProduct() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { toast } = useToast();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { drive, getOrCreateStorageAccountByName } =
    useShadowDrive(wallet, connection);

  const { back, replace } = useRouter();

  const [files, setFiles] = useState<any>([]);

  const handleSubmit = async () => {
    // TODO: Add form validation later
    const productName = nameRef.current?.value;
    const productDescription =
      descriptionRef.current?.value;

    let storageAccount;

    if (!wallet?.publicKey) {
      return;
    }

    // Upload the file to Shadow drive.
    try {
      storageAccount =
        await getOrCreateStorageAccountByName(
          "gatelinks_bucket"
        );
    } catch (e: any) {
      console.log(e);
      toast({
        description: e.message,
        variant: "destructive",
      });
    }

    if (!storageAccount) {
      toast({
        description: "Storage Account not found",
        variant: "destructive",
      });
      return;
    }

    toast({
      description: "Storage Account created or found",
    });

    let fileUploadResponse;

    try {
      fileUploadResponse = await drive?.uploadFile(
        storageAccount.publicKey,
        files[0]
      );
    } catch (e) {
      console.log(e);
    }

    if (!fileUploadResponse) {
      toast({
        description: "File upload failed",
        variant: "destructive",
      });
      return;
    }

    // Filename to store the assosicated data
    const productHash = fileUploadResponse.message;

    const metadataUri = new URL(
      fileUploadResponse.finalized_locations[0]
    ).toString();

    console.log(metadataUri);

    toast({
      title: "File uploaded Successfully",
      description: `Check it out here`,
      action: (
        <ToastAction
          altText="See file"
          onClick={() => window.open(metadataUri, "_blank")}
        >
          See file
        </ToastAction>
      ),
    });

    // Then save this product into a db for this user.

    const product: NewProduct = {
      description:
        productDescription ??
        "This is the default description",
      name: productName ?? "Default name",
      productLink: "metadataUri",
      productHash: "nsd",
      price: "0.0001",
      creatorWallet: wallet?.publicKey?.toString()!,
      createdDate: new Date().toISOString(),
    };

    const response = await fetch("/api/create-product", {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const returnedResponse = await response.json();

    if (returnedResponse.error) {
      toast({
        description: `${returnedResponse.error}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Product stored in DB",
        description: `${productName} stored!`,
      });
    }

    return replace("/products");
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
