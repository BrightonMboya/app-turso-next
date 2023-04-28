import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import BlurImage from "../components/BlurImage";

type QueryResult = {
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
  const [result, setResult] = useState<QueryResult[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  const data = axios.get("/api/turso").then((res) => {
    setResult(res.data);
    console.log(result);
  });

  return (
    <div>
      <p className="text-2xl font-medium ">Some Fancy Destinations</p>
      {!result && <p>Loading...</p>}
      {result?.map((item) => (
        <div
          className="w-[300px] relative overflow-hidden"
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
              "object-cover object-top duration-700 ease-in-out",

              isLoading
                ? "scale-110 blur-2xl grayscale bg-blue-300 "
                : "scale-100 blur-0 grayscale-0"
            )}
          />

          <h3 className="text-lg ">
            {item.name}, {item.location}
          </h3>
          <p>{item.location}</p>
        </div>
      ))}
    </div>
  );
}
