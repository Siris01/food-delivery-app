import prisma from '@prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		res.status(405).end();
		return;
	}

	const { email, password } = req.body;

	if (!email || !password) {
		res.status(404).send('Missing credentials');
		return;
	}

	const user = await prisma.users.findFirst({
		where: {
			email,
			password
		}
	});

	console.log(user);

	if (!user) {
		res.status(401).send('Invalid credentials');
		return;
	}

	const session = await prisma.sessions.create({
		data: {
			userId: user.id,
			token: randomBytes(128).toString('hex')
		}
	});

	res.setHeader('Set-Cookie', `token=${session.token}; path=/; httponly secure`).status(204).end();
}
