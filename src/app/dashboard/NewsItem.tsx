import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImageIcon, Pencil, TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import NewsForm from "./NewsForm";
import { toast } from "@/components/ui/use-toast";
import { removeTimeFromDate } from "@/lib/utils";

type NewsItemProps = {
  src: string;
  title: string;
  author: string;
  content: string;
  time: string;
  newsLink: string;
};

export default function NewsItem({
  src,
  title,
  author,
  content,
  time,
  newsLink,
}: NewsItemProps) {
  const handleDelete = () => {
    // TODO: Implement API to handle deletion (currently not available)
    try {
      toast({
        title: "News deleted successfully",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Failed to delete news",
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="w-full max-w-[800px] my-3 relative mx-auto">
      {src && (
        <Image
          alt={title}
          quality={100}
          className="rounded-t-lg object-cover"
          height="300"
          width="300"
          src={src}
          style={{
            objectFit: "cover",
            height: "300px",
            width: "800px",
          }}
        />
      )}
      {!src && (
        <div className="flex items-center justify-center max-w-[800px] h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            <p className="text-gray-500 dark:text-gray-400">Image not found</p>
          </div>
        </div>
      )}
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div>By {author}</div>
            <div>{removeTimeFromDate(time)}</div>
          </div>
        </div>
        <p className="text-sm leading-relaxed">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Dialog modal>
          <DialogTrigger asChild>
            <Button variant="default">
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit News</DialogTitle>
            <NewsForm
              article={{
                author,
                content,
                url: newsLink,
                title,
                urlToImage: src,
                publishedAt: time,
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog modal>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <TrashIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm</DialogTitle>
            Are you sure you want to delete this news?
            <DialogFooter>
              <Button variant="outline">Cancel</Button>{" "}
              <Button variant="destructive">Yes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog modal>
          <DialogTrigger asChild>
            <Button variant="outline">View</Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen h-screen">
            <DialogTitle>News</DialogTitle>
            <iframe
              src={newsLink}
              className="iframe-content"
              style={{ height: "100%", width: "100%" }}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
