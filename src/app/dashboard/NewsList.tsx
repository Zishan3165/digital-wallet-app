"use client";
import { useState } from "react";
import { getNewsAction } from "./getNewsAction";
import NewsItem from "./NewsItem";
import { Button } from "@/components/ui/button";
import { INITIAL_PAGE, News, PAGE_SIZE } from "./utils";

type NewsListProps = {
  initialList: News[];
};

export default function NewsList({ initialList }: NewsListProps) {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [newsList, setNewsList] = useState<News[]>(initialList);
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadMoreNews = async () => {
    if (hasMoreData) {
      const apiNewsList = await getNewsAction(page, PAGE_SIZE);
      if (apiNewsList.length == 0) {
        setHasMoreData(false);
      }
      setNewsList((prevNewsList) => [...prevNewsList, ...apiNewsList]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      {newsList.map((article) => (
        <NewsItem
          key={article.url}
          title={article.title}
          author={article.author || ""}
          content={article.content}
          src={article.urlToImage || ""}
          time={article.publishedAt}
          newsLink={article.url}
        />
      ))}
      {hasMoreData ? (
        <Button
          className="mx-auto flex justify-center my-2"
          onClick={loadMoreNews}
        >
          Load More Posts
        </Button>
      ) : null}
    </div>
  );
}
