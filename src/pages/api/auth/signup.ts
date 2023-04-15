import prisma from '@prisma';
import { randomBytes } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') return res.status(405).end();

	const { username, email, password } = req.body;
	if (!username || !email || !password) return res.status(404).send('Missing credentials');

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

	res
		.setHeader('Set-Cookie', [
			`token=${session.token}; Path=/; HttpOnly; Secure`,
			`username=${user.username}; Path=/; Secure`
		])
		.status(204)
		.end();
}
