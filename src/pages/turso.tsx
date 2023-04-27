import axios from "axios";
import { useState } from "react";
import Image from "next/image";

type QueryResult = {
  message: string;
};

interface CardProps {
  imageUrl: string;
}
function Card({ imageUrl }: CardProps) {
  return (
    <div>
      <div className="w-[300px] h-[200px] rounded-md">
        <Image src={imageUrl} alt="Picture of the author" />
      </div>
    </div>
  );
}

export default function MyPage() {
  const [result, setResult] = useState<QueryResult[] | null>(null);

  const data = axios.get("/api/turso").then((res) => {
    setResult(res.data);
    console.log(result);
    // console.log(res.data);
  });

  return (
    <div>
      {/* <button onClick={fetchData}>Fetch Data</button> */}
      {result && <p>{result[0]?.message}</p>}
    </div>
  );
}
