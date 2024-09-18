import { getFriendsDomains, getMetadata } from '$lib/api';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
	try {
		const friendsDomains = await getFriendsDomains(params.domain as string, fetch);
		const friendsPromises = friendsDomains.map((friend) => getMetadata(friend, fetch));
		const friends = await Promise.all(friendsPromises);
		return json(friends);
	} catch (error) {
		return json([]);
	}
};
