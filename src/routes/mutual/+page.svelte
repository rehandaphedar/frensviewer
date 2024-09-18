<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import FriendLink from '$lib/components/FriendLink.svelte';

	const formatter = new Intl.ListFormat(undefined, { type: 'conjunction' });
	$: websites = $page.url.searchParams
		.get('q')
		?.split(',')
		.filter((website) => website != '');
	$: title = formatter.format(websites || []);

	let websiteToAdd: string | null;

	let mutualFriends: Record<string, unknown>[] = [];

	const getMutualFriends = async () => {
		mutualFriends = [];
		const url = new URL('/api/mutualFriends', `https://${$page.url.host}`);
		url.searchParams.append('q', (websites || []).join(','));
		const res = await fetch(url);
		mutualFriends = await res.json();
	};
	const getMutualFriendsWithMetadata = async () => {
		const initialURL = $page.url.toString();
		const url = new URL('/api/mutualFriendsWithMetadata', `https://${$page.url.host}`);
		url.searchParams.append('q', (websites || []).join(','));
		const res = await fetch(url);
		const possibleMutualFriends = await res.json();
		// This prevents an older metadata fetch from overwriting a newer "bare" (without metadata) fetch
		if ($page.url.toString() == initialURL && possibleMutualFriends.length > 1) {
			mutualFriends = possibleMutualFriends;
		}
	};

	$: {
		title = formatter.format(websites || []);
		if (browser) {
			getMutualFriends();
			getMutualFriendsWithMetadata();
		}
	}

	const removeWebsite = (websiteToRemove: string) => {
		$page.url.searchParams.set(
			'q',
			websites?.filter((website) => website != websiteToRemove)
		);
		goto(`?${$page.url.searchParams.toString()}`);
	};

	const addWebsite = () => {
		$page.url.searchParams.set('q', [websiteToAdd, ...websites].join(','));
		websiteToAdd = null;
		goto(`?${$page.url.searchParams.toString()}`);
	};
</script>

<svelte:head>
	<title>Mutual Friends of {title} | frensviewer</title>
</svelte:head>

<h1 class="h1">
	Mutual Friends of {title}
</h1>

<sction class="flex flex-col gap-2">
	{#each websites as website}
		<div class="flex justify-between">
			<a class="link" href={`https://${website}`}>{website}</a>
			<button class="btn fa-minus font-[FontAwesome]" on:click={() => removeWebsite(website)} />
		</div>
	{/each}
	<form class="flex justify-between" on:submit|preventDefault={addWebsite}>
		<input class="input" type="text" bind:value={websiteToAdd} />
		<button class="btn fa-plus font-[FontAwesome]" type="submit" />
	</form>
</sction>

{#if mutualFriends.length > 0}
	<section class="friends-grid">
		{#each mutualFriends as friend (friend.domain)}
			<FriendLink {friend} />
		{/each}
	</section>
{:else}
	<p class="text-center">
		Seems like {title} don't have any mutual friends 😬.
	</p>
{/if}
