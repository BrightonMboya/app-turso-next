import Turso from '../../db/turso';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const client = Turso();
        const response = await client.execute("SELECT * FROM popular_destinations;");
        const posts = response.rows.map((post) => {
            return {
                id: post.id,
                country: post.country,
                name: post.name,
                location: post.location,
                image_url: post.image_url,
            }
        })

        res.status(200).json(posts);


    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}

