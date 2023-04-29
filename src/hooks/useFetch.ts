import { useEffect, useState } from "react";
import axios from "axios";
import type { QueryResult } from "../pages";

const useFetch = (url: string) => {
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState("");
    useEffect(() => {
        axios.get(url).then((res): void => {
            setdata(res.data as QueryResult[]);
            setloading(false);
        })
            .catch((err) => {
                seterror(err.message);
                setloading(false);
            });
    }, [url]);
    return { data, loading, error };
};

export default useFetch;