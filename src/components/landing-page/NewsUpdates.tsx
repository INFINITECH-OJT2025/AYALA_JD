import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function NewsUpdates() {
  const news = [
    {
      title: "Ayala Land Expands Sustainable Developments",
      image: "/prop1.jpg", // Replace with actual image
      date: "February 20, 2025",
      author: "Ayala Land Team",
      excerpt: "Discover how Ayala Land is leading the way in sustainable and eco-friendly real estate projects...",
      link: "/news/ayala-land-sustainability",
    },
    {
      title: "New Residential Project Launch in Makati",
      image: "/prop2.jpg", // Replace with actual image
      date: "February 15, 2025",
      author: "Real Estate News",
      excerpt: "A brand-new luxury residential tower is set to redefine modern living in the heart of Makati...",
      link: "/news/makati-residential-launch",
    },
    {
      title: "Ayala Land Recognized for Excellence in Property Management",
      image: "/prop3.jpg", // Replace with actual image
      date: "February 10, 2025",
      author: "Business Insider PH",
      excerpt: "Ayala Land receives the 'Best Property Management Company' award for its outstanding service...",
      link: "/news/ayala-land-award",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Latest News & Updates</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Stay informed with the latest developments, projects, and achievements from Ayala Land.
        </p>

        {/* News Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition">
              <Image src={item.image} width={600} height={300} alt={item.title} className="rounded-t-lg w-full h-40 object-cover" />
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-sm text-gray-500">{item.date} • {item.author}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link href={item.link} passHref>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stay Updated Section */}
        <div className="mt-12 bg-gray-100 p-8 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-semibold text-gray-800">Stay Updated</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Never miss an update! Subscribe to our newsletter for the latest news, real estate trends, and exclusive offers.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 border rounded-lg shadow-sm w-full md:w-1/3"
            />
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
