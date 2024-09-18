import { getDefaultImage, getMutualFriendsDomains } from '$lib/api';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const websites = url.searchParams.get('q')?.split(',') as string[];
	const mutualFriendsDomains = await getMutualFriendsDomains(websites, fetch);
	const mutualFriends = mutualFriendsDomains.map((mutualFriendsDomain: string) => {
		return {
			domain: mutualFriendsDomain,
			title: mutualFriendsDomain,
			image: getDefaultImage(mutualFriendsDomain)
		};
	});
	return json(mutualFriends);
};
