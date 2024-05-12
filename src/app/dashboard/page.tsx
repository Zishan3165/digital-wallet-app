import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
import NewsList from "./newsList";
import { getNews } from "./getNews";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewsForm from "./NewsForm";

export default async function DashboardPage() {
  const initialNewsList = await getNews(1, 10);
  return (
    <ProtectedRoutes>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex justify-center m-auto">
            <PlusIcon /> Add Article
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogTitle>Create News</DialogTitle>
          <NewsForm />
        </DialogContent>
      </Dialog>

      <div>
        <NewsList initialList={initialNewsList} />
      </div>
    </ProtectedRoutes>
  );
}
