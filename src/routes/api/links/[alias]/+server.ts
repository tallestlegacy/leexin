import mongo from '@/db/mongo';
import { CLICK_COLLECTION_NAME, LINKS_COLLECTION_NAME } from '$env/static/private';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { alias } = params;
	const collection = mongo.db.collection(LINKS_COLLECTION_NAME);
	const res = await collection.findOne({ alias });

	if (res) {
		const clicks = mongo.db.collection(CLICK_COLLECTION_NAME);
		await clicks.insertOne({ alias, datetime: new Date() });
		return json(res);
	}

	return error(404, 'Link not found');
};
