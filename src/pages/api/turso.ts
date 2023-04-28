import useTurso from '../../db/turso';
import { NextApiRequest, NextApiResponse } from 'next';
import type { ResultSet } from '@libsql/client';

const responseDataAdapter = (data: ResultSet): any[] => {
    if (!data?.columns || !data?.rows) {
        throw new Error("Malformed response from turso");
    }

    const { columns, rows } = data;
    const formattedData: any[] = [];

    for (const row of rows) {
        const rowData: { [k: string]: any } = {};
        for (let i = 0; i < columns.length; i++) {
            //@ts-ignore
            rowData[columns[i]] = row[i];
        }

        formattedData.push(rowData as unknown as any);
    }

    return formattedData;
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }


    try {
        const client = useTurso();
        const response = await client.execute("SELECT * FROM popular_destinations;");
        const allPosts = responseDataAdapter(response);
        const posts = allPosts.map((post) => {
            return {
                id: post.id,
                country: post.country,
                name: post.name,
                location: post.location,
                image_url: post.image_url,
            }
        })

        res.status(200).json(posts);


    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}