import ProtectedRoutes from "@/components/ProtectedRoutes";
import React from "react";
import NewsList from "./newsList";
import { getNews } from "./getNews";

export default async function DashboardPage() {
  const initialNewsList = await getNews(1, 10);
  return (
    <ProtectedRoutes>
      <div>
        <NewsList initialList={initialNewsList} />
      </div>
    </ProtectedRoutes>
  );
}
