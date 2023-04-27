import { createClient } from "@libsql/client";

export default function () {
    const config = {
        url: "libsql://tonero-brightonmboya.turso.io",
        authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI2MjQ3ODIsImlkIjoiMmZlYTI5Y2UtZTQ4My0xMWVkLWEzMDItMmFmYjRhMTEwMDAwIn0.xhddCbapCfm2RgxEv28ejX6MuKJGSZmKeRTPPwfJFfZyEQEQ9rOzMN7Z70VshkopvWmSZ7mzdElyGteM4HYiBA"
    }

    return createClient(config);
}