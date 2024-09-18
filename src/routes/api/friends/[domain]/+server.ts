import { getDefaultImage, getFriendsDomains } from '$lib/api';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const friendsDomains = await getFriendsDomains(params.domain as string, fetch);
	const friends = friendsDomains.map((friendsDomain: string) => {
		return {
			domain: friendsDomain,
			title: friendsDomain,
			image: getDefaultImage(friendsDomain)
		};
	});
	return json(friends);
};
