import { getMetadata } from '$lib/api';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const metadata = await getMetadata(params.domain as string, fetch);
	return json(metadata);
};
