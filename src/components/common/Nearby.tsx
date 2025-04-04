import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Nearby = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
        Nearby Properties
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mt-2">
        Discover your dream home from our curated collection of luxurious
        properties.
      </p>

      {/* Card */}
      <Card className="mt-10 w-full max-w-md p-6 text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg">
        <CardContent className="flex flex-col items-center">
          <MapPin className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
            No Nearby Properties
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            It seems there are no properties nearby. Please check back later or
            explore other areas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Nearby;
