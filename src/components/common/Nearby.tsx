import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Nearby = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 ">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-500">
        Nearby Properties
      </h1>
      <p className="text-gray-600 max-w-md mt-2">
        Discover your dream home from our curated collection of luxurious
        properties.
      </p>
      <Card className="mt-10 w-full max-w-md p-6 text-center bg-white dark:bg-gray-800">
        <CardContent className="flex flex-col items-center">
          <MapPin className="w-12 h-12 text-gray-400" />
          <h2 className="text-xl font-semibold mt-4">No Nearby Properties</h2>
          <p className="text-gray-500 mt-2">
            It seems there are no properties nearby. Please check back later or
            explore other areas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Nearby;
