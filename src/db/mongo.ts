import { MONGO_CONNECTION_STRING, DATABASE_NAME } from '$env/static/private';
import { FindCursor, MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_CONNECTION_STRING);

export function start_mongo() {
	return client.connect();
}

async function findDocuments(cursor: FindCursor) {
	const docs = [];

	for await (const doc of cursor) {
		docs.push(doc);
	}

	return docs;
}

export default {
	db: client.db(DATABASE_NAME),
	client,
	readCursor: findDocuments
};
