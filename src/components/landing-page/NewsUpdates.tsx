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

  useEffect(() => {
    const getNews = async () => {
      try {
        const data: NewsItem[] = await fetchPublishedNews();
        setNews(data.filter((n: NewsItem) => n.is_featured));
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  // ✅ Extract unique categories from news data
  const categories = ["All", ...new Set(news.map((item) => item.category))];

  // ✅ Filter news based on the selected category
  const filteredNews =
    selectedCategory === "All"
      ? news
      : news.filter((article) => article.category === selectedCategory);

  return (
    <section className="py-12 px-6 lg:px-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
          Featured News
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Stay updated with our latest featured news and announcements.
        </p>

        {/* ✅ Category Filter */}
        <div className="mb-6">
          {/* Mobile Dropdown */}

          {/* ✅ "See All News" button */}
          <div className="mt-2 mb-2 flex justify-center">
            <a
              href="/landing/News"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
            >
              See All News
            </a>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            Loading news...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredNews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <Card
                key={article.id}
                className="p-6 shadow-md dark:shadow-lg bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-xl transition flex flex-col h-full"
              >
                {article.image && (
                  <Image
                    src={
                      article.image.startsWith("http")
                        ? article.image
                        : `/storage/news_images/${article.image}`
                    }
                    alt={article.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}

                {/* ✅ Title & Date are aligned properly */}
                <CardHeader className="flex flex-col">
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
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
      </div>

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
