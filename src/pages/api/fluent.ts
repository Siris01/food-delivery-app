import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const e = req.query.emoji as string;
	const url = `/fluentui-emoji/assets/${capitalizeFirstLetter(e.toLowerCase()).replace(
		/-/g,
		' '
	)}/Color/${e.toLowerCase()}_color.svg`;

	return res.redirect(url);
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
