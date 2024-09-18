<script lang="ts">
	import { browser } from '$app/environment';

	import { page } from '$app/stores';
	import FriendLink from '$lib/components/FriendLink.svelte';
	import { hashCode } from '$lib/util';

	$: title = $page.params.website;
	$: image = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${hashCode(
		$page.params.website
	)}`;
	let friends: Record<string, unknown>[] = [];

	const getFriends = async () => {
		friends = [];
		const friendsRes = await fetch(`/api/friends/${$page.params.website}`);
		friends = await friendsRes.json();
	};
	const getFriendsWithMetadata = async () => {
		const friendsRes = await fetch(`/api/friendsWithMetadata/${$page.params.website}`);
		const friendsWithMetadata = await friendsRes.json();
		if (friendsWithMetadata.length > 1) {
			friends = friendsWithMetadata;
		}
	};
	const getMetadata = async () => {
		const metadataRes = await fetch(`/api/metadata/${$page.params.website}`);
		const json = await metadataRes.json();
		title = json.title || title;
		image = json.image || image;
	};

	$: {
		title = $page.params.website;
		image = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${hashCode(
			$page.params.website
		)}`;
		if (browser) {
			getFriends();
			getFriendsWithMetadata();
			getMetadata();
		}
	}
</script>

<svelte:head>
	<title>{title} | frensviewer</title>
</svelte:head>

<h1 class="h1">
	Friends of {title}
	<a href="https://{$page.params.website}"
		><img alt={`${title}'s image`} src={image} class="image-link inline h-[64px] w-[64px]" /></a
	>
</h1>
<a class="btn block mx-auto my-4 w-fit" href={`/mutual?q=${$page.params.website}`}
	>View Mutual Friends</a
>

{#if friends.length > 0}
	<section class="friends-grid">
		{#each friends as friend (friend.domain)}
			<FriendLink {friend} />
		{/each}
	</section>
{:else}
	<p class="text-center">
		Seems like {title} doesn't have any friends 😬.
	</p>
{/if}
