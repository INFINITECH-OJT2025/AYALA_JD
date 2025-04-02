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

export function NonFeaturedNewsUpdates() {
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
        // Remove filter is_featured & sort by latest to old
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setNews(sortedData);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  const categories = ["All", ...new Set(news.map((item) => item.category))];

  const filteredNews =
    selectedCategory === "All"
      ? news
      : news.filter((article) => article.category === selectedCategory);

  return (
    <section className="py-4 px-6 lg:px-24 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
          Latest News
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Stay informed with our latest news and updates.
        </p>

        {/* Category Buttons - Responsive */}
        <div className="mb-6">
          {/* Mobile Dropdown */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md flex justify-between items-center"
            >
              {selectedCategory || "Select Category"}
              <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                        : "text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm sm:text-base rounded-md transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Handling */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            Loading news...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <Card
                key={article.id}
                className="p-6 shadow-md dark:shadow-lg bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-xl transition flex flex-col h-full"
              >
                {/* Image */}
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

                {/* Title and Metadata */}
                <CardHeader className="mb-2">
                  <CardTitle className="text-lg font-semibold truncate">
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

                {/* Description */}
                <CardContent className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {article.content}
                  </p>
                </CardContent>

                {/* Read More Button */}
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
                {new Date(selectedNews.created_at).toLocaleDateString()}
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
