import { createClient } from "@libsql/client/web";

export default function Turso() {
    const config = {
        url: process.env.url,
        authToken: process.env.authToken,
    }

    return createClient(config);
}