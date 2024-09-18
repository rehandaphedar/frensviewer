import { hashCode } from '$lib/util';
import parse from 'node-html-parser';

export const getFriendsDomains = async (domain: string, customFetch: typeof fetch) => {
	try {
		const res = await customFetch(`https://${domain}/friends.txt`);
		if (!(res.status == 200)) {
			throw 'The website returned an error';
		}
		if (!res.headers.get('content-type')?.includes('text/plain')) {
			throw 'The returned friends.txt is not plaintext';
		}
		const text = await res.text();
		const friendsDomains = text.split('\n').filter((friend) => friend != '');
		return friendsDomains;
	} catch {
		return [];
	}
};

export const getMetadata = async (domain: string, customFetch: typeof fetch) => {
	let title = domain;
	let image = getDefaultImage(domain);
	try {
		const res = await customFetch(`https://${domain}`);
		const text = await res.text();
		const html = parse(text);

		title = html.querySelector('title')?.textContent || title;

		const htmlImage = html.querySelector('link[rel=icon]')?.getAttribute('href') || null;
		image = htmlImage ? new URL(htmlImage, `https://${domain}`).href : image;

		return { domain, title, image };
	} catch {
		return { domain, title, image };
	}
};

export const getMutualFriendsDomains = async (websites: string[], customFetch: typeof fetch) => {
	try {
		const websitesPromises = websites.map((website) => getFriendsDomains(website, customFetch));
		const websitesFriendsDomains = await Promise.all(websitesPromises);
		const mutualFriendsDomains = websitesFriendsDomains.reduce((p: string[], c: string[]) =>
			p.filter((e: string) => c.includes(e))
		);
		return mutualFriendsDomains;
	} catch {
		return [];
	}
};

export const getDefaultImage = (domain: string) => {
	return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${hashCode(domain)}`;
};
