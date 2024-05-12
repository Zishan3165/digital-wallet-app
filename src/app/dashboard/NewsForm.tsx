"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { News } from "./getNews";

const FormSchema = z.object({
  author: z.string(),
  title: z.string(),
  url: z.string(),
  urlToImage: z.string(),
  content: z.string(),
});

export default function NewsForm({ article }: { article?: News }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: article
      ? {
          author: article.author || "",
          title: article.title,
          url: article.url,
          urlToImage: article.urlToImage || "",
          content: article.content,
        }
      : {},
  });

  function onCreate(data: z.infer<typeof FormSchema>) {
    // TODO: Implement API to handle creation (currently not available)
    const articleBody: News = { ...data, publishedAt: new Date().toString() };
    try {
      toast({
        title: "News created successfully",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Failed to create news",
        variant: "destructive",
      });
    }
  }

  function onEdit(data: z.infer<typeof FormSchema>) {
    // TODO: Implement API to handle update (currently not available)
    try {
      toast({
        title: "News updated successfully",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Failed to update news",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(article ? onEdit : onCreate)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Url *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urlToImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content *</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
