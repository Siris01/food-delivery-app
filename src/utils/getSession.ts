import prisma from '@prisma';
import { NextApiRequest } from 'next';

export const getSession = async (req: NextApiRequest) => {
	const token = req.cookies.token;
	if (!token) return null;

	const session = await prisma.sessions.findFirst({
		where: {
			token
		}
	});

	return session;
};
