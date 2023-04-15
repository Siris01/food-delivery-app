import prisma from '@prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') return res.status(405).end();

	const { email, password } = req.body;
	if (!email || !password) return res.status(404).send('Missing credentials');

	const user = await prisma.users.findFirst({
		where: {
			email,
			password
		}
	});

	if (!user) return res.status(401).send('Invalid credentials');

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
