import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return res.status(200); // Fetch dish from specific restaurant by id
}
