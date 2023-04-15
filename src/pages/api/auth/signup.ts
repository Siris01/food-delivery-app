import prisma from '@prisma';
import { randomBytes } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') return res.status(405).end();

	const { username, email, password } = req.body;

	const user = await prisma.users.create({
		data: {
			username,
			email,
			password
		}
	});

	const session = await prisma.sessions.create({
		data: {
			userId: user.id,
			token: randomBytes(128).toString('hex')
		}
	});

	return res.setHeader('Set-Cookie', `token=${session.token}; path=/; httponly secure`).status(204);
}
