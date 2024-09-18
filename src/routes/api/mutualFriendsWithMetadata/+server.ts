import { getMetadata, getMutualFriendsDomains } from '$lib/api';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const websites = url.searchParams.get('q')?.split(',') as string[];
	const mutualFriendsDomains = await getMutualFriendsDomains(websites, fetch);
	const mutualFriendsPromises = mutualFriendsDomains.map((mutualFriend) =>
		getMetadata(mutualFriend, fetch)
	);
	const mutualFriends = await Promise.all(mutualFriendsPromises);
	return json(mutualFriends);
};
