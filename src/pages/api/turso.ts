import Turso from '../../db/turso';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResultSet } from '@libsql/client/web';
import type { QueryResult } from '..';

const responseDataAdapter = (data: ResultSet): any[] => {
    if (!data?.columns || !data?.rows) {
        throw new Error("Malformed response from turso");
    }

    const { columns, rows } = data;
    const formattedData = [];

    for (const row of rows) {
        const rowData: { [k: string]: any } = {};
        for (let i = 0; i < columns.length; i++) {

            rowData[columns[i]] = row[i];
        }

        formattedData.push(rowData as unknown as any);
    }

    return formattedData;
}


export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    try {
        const client = Turso();
        const response = await client.execute("SELECT * FROM popular_destinations;");
        const allPosts = responseDataAdapter(response);
        const posts: QueryResult[] = allPosts.map((post) => {
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