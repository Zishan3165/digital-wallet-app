import React from "react";
import { getNewsAction } from "./getNewsAction";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewsForm from "./NewsForm";
import NewsList from "./NewsList";
import { INITIAL_PAGE, PAGE_SIZE } from "./utils";

export default async function DashboardPage() {
  const initialNewsList = await getNewsAction(INITIAL_PAGE, PAGE_SIZE);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex justify-center m-auto">
            <PlusIcon /> Add News
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogTitle>Add News</DialogTitle>
          <NewsForm />
        </DialogContent>
      </Dialog>
      <NewsList initialList={initialNewsList} />
    </>
  );
}
