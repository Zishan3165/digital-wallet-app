export const PAGE_SIZE = 10;
export const INITIAL_PAGE = 1;

export type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: News[];
};

export type News = {
  author: string | null;
  title: string;
  content: string;
  publishedAt: string;
  urlToImage: string | null;
  url: string;
};
