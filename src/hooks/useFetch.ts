import { useEffect, useState } from "react";
import axios from "axios";
import type { QueryResult } from "../pages";

export type fetchResponse = {
    data: QueryResult[];
    loading: boolean;
    error: string;
};


const useFetch = (url: string): fetchResponse => {
    const [data, setdata] = useState<QueryResult[]>(null);
    const [loading, setloading] = useState<boolean>(true);
    const [error, seterror] = useState<string>("");
    useEffect(() => {
        axios.get(url).then((res): void => {
            setdata(res.data as QueryResult[]);
            setloading(false);
        })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    seterror(err.message);
                    setloading(false);
                }
            });
    }, [url]);
    return { data, loading, error };
};

export default useFetch;