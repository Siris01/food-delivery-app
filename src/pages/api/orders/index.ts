import { CartItem } from '@pages/cart';
import prisma from '@prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@utils/getSession';
import OpenLocationCode from '@utils/plusCodes';
import calculateDistance from '@utils/calculateDistance';

export interface Order {
	id: number;
	createdAt: Date;
	eta?: Date;
	status: string;
	items?: CartItem[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession(req);
	if (!session) return res.status(401).end();

	if (req.method === 'GET') {
		const orders = await prisma.orders.findMany({
			where: {
				userId: session.userId
			}
		});

		res.status(200).json({ orders });
	} else if (req.method === 'POST') {
		const { items, location } = req.body;
		if (!location || !location.lat || !location.lon) return res.status(400).send('Missing location');
		if (items?.length === 0) return res.status(400).send('Missing items');

		const order = await prisma.orders.create({
			data: {
				status: 'pending',
				userId: session.userId,
				deliveryAddress: OpenLocationCode.encode(location.lat, location.lon)
			}
		});

		for (const item of items as CartItem[]) {
			await prisma.order_items.create({
				data: {
					quantity: item.quantity,
					dishId: item.id,
					orderId: order.id
				}
			});
		}

		res.status(200).json({ id: order.id });

		const eta = await calculateETA(items, location);
		await prisma.orders.update({
			where: { id: order.id },
			data: {
				status: 'processing',
				eta: new Date(Date.now() + eta * 1000)
			}
		});
	} else res.status(405).end();
}

const calculateETA = async (items: { id: number }[], location: { lat: number; lon: number }) => {
	const restaurants = (
		await prisma.dishes.findMany({
			where: {
				id: { in: items.map((i) => i.id) }
			},
			select: {
				restaurantId: true
			}
		})
	).map((d) => d.restaurantId);

	const locations = (
		await prisma.restaurants.findMany({
			where: {
				id: { in: restaurants }
			},
			select: {
				location: true
			}
		})
	).map((r) => r.location);

	const distances = locations.map((l) => {
		const resLocation = OpenLocationCode.decode(l);
		return calculateDistance(location, { lat: resLocation.latitudeCenter, lon: resLocation.longitudeCenter });
	});

	const TO_AND_FRO_FACTOR = 1.25;
	const SPEED = 60; // kmph

	return Math.round(((TO_AND_FRO_FACTOR * Math.max(...distances)) / SPEED) * 60 * 60); // in seconds
};
