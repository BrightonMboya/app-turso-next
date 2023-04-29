import { useState } from "react";
import Image from "next/image";
import useFetch from "../hooks/useFetch";
import type { fetchResponse } from "../hooks/useFetch";

export type QueryResult = {
  id: number | null;
  country: string;
  name: string;
  location: string;
  image_url: string;
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MyPage() {
  const [isLoading, setLoading] = useState(true);
  const { data, loading, error }: fetchResponse = useFetch("/api/turso");

  return (
    <main className="font-montserrat flex items-center justify-center">
      <section>
        <h3 className="text-2xl font-medium ">Some Fancy Destinations</h3>
        <p className="text-base">
          List of Vacation Homes to Enjoy once in a while
        </p>

        {loading && <p>Loading...</p>}
        {error && <p>Error countered while fetching: {error}</p>}
        <div className="flex flex-col items-center justify-center gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {data?.map((item: QueryResult) => (
            <div
              className="w-[300px] relative flex flex-col items-center justify-center p-4 m-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              key={item.image_url}
            >
              <Image
                src={item.image_url}
                alt="Picture of the author"
                width={350}
                height={200}
                priority={false}
                onLoadingComplete={() => setLoading(false)}
                draggable={false}
                className={cn(
                  "object-cover object-top duration-700 ease-in-out border-[1px]",

                  isLoading
                    ? "scale-110 blur-2xl grayscale bg-blue-300 "
                    : "scale-100 blur-0 grayscale-0"
                )}
              />

              <h3 className="text-lg ">
                {item.name}, {item.location}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
