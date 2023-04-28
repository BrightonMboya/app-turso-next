import { createClient } from "@libsql/client/web";

export default function () {
    const config = {
        url: process.env.url as string,
        authToken: process.env.authToken as string,
    }

    return createClient(config);
}