"use server";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const apiKey = process.env.API_KEY;

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

const NewsSchema = z.object({
  author: z.string().nullable(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.string(),
  urlToImage: z.string().nullable(),
  url: z.string(),
});

const NewsApiResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(NewsSchema),
});

const fetchWithZod = createZodFetcher();

export const getNews = async (page: number, size: number): Promise<News[]> => {
  const url = `https://newsapi.org/v2/everything?q=usdc&apiKey=${apiKey}&page=${page}&pageSize=${size}&sortBy=publishedAt`;

  try {
    const response = await fetchWithZod(NewsApiResponseSchema, url);
    return response.articles;
  } catch (error: unknown) {
    console.error(error);
    throw new Error(`An error occurred: ${error}`);
  }
};
