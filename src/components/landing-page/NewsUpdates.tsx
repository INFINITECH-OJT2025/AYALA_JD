"use client";

import { useEffect, useState } from "react";
import { fetchPublishedNews } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  content: string;
  image?: string;
  created_at: string;
  is_featured: boolean;
}

export function NewsUpdates() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data: NewsItem[] = await fetchPublishedNews();
        const featuredNews = data
          .filter((n: NewsItem) => n.is_featured)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 5); // Get only the 5 newest
        setNews(featuredNews);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  // ✅ Filter news based on the selected category
  const filteredNews =
    selectedCategory === "All"
      ? news
      : news.filter((article) => article.category === selectedCategory);

  return (
    <section className="py-16 px-6 bg-white dark:bg-black">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        {/* Title and Description (Left side) */}
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Featured News
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-4">
            Stay updated with our latest featured news and announcements.
          </p>
        </div>

        {/* "See All News" Button (Right side) */}
        {/* <div className="self-start md:self-auto">
          <a
            href="/landing/News"
            className="inline-flex items-center px-6 py-2 bg-emerald-700 dark:bg-emerald-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-emerald-800 dark:hover:bg-emerald-700 transition"
          >
            See All News
            <FaArrowRight className="ml-2 rotate-45" />
          </a>
        </div> */}
      </div>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading news...
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredNews.map((article) => (
            <Card
              key={article.id}
              className="p-4 shadow-md dark:shadow-lg bg-white dark:bg-[#18181a] hover:shadow-lg dark:hover:shadow-xl transition flex flex-col h-full"
            >
              {article.image && (
                <div className="relative w-full h-40 mb-4">
                  {!imageLoaded && (
                    <Skeleton className="w-full h-40 rounded-lg absolute top-0 left-0" />
                  )}
                  <Image
                    src={
                      article.image.startsWith("http")
                        ? article.image
                        : `/storage/news_images/${article.image}`
                    }
                    alt={article.title}
                    width={500}
                    height={300}
                    className={`w-full h-40 object-cover rounded-lg block hover:scale-105 transition-transform duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              )}

              {/* ✅ Title & Date are aligned properly */}
              <CardHeader className="flex flex-col">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {article.title}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {article.category} •{" "}
                  {new Date(article.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </CardHeader>

              {/* ✅ Content takes remaining space to ensure buttons align */}
              <CardContent className="flex-grow">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {article.content}
                </p>
              </CardContent>

              {/* ✅ Ensures button is always at the bottom */}
              <div className="mt-auto">
                <Button
                  className="w-full"
                  variant="success"
                  onClick={() => setSelectedNews(article)}
                >
                  View Full Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No news available in this category.
        </p>
      )}

      {selectedNews && (
        <Dialog
          open={!!selectedNews}
          onOpenChange={() => setSelectedNews(null)}
        >
          <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedNews.title}</DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedNews.category} •{" "}
                {new Date(selectedNews.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </DialogHeader>

            {selectedNews.image && (
              <Image
                src={
                  selectedNews.image.startsWith("http")
                    ? selectedNews.image
                    : `/storage/news_images/${selectedNews.image}`
                }
                alt={selectedNews.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}

            {/* ✅ Scrollable Description */}
            <div className="flex-1 overflow-y-auto max-h-[40vh] p-2">
              <p className="text-gray-700 dark:text-gray-300 text-justify">
                {selectedNews.content}
              </p>
            </div>

            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
