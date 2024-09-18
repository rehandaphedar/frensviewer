import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch('https://git.sr.ht/~rehandaphedar/friends.txt/blob/main/websites.txt');
	const text = await res.text();
	const websites = text.split('\n').filter((friend) => friend != '');

	return json(websites);
};
