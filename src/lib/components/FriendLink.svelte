<script lang="ts">
	import type { Friend } from '$lib/types';
	export let friend: Friend;
</script>

<div class="flex flex-col items-center gap-2 p-6">
	<a href={`https://${friend.domain}`}>
		<img alt={`${friend.title}'s image`} src={friend.image} class="image-link h-[64px] w-[64px]" />
	</a>
	<a href={`/website/${friend.domain}`} class="link">{friend.title}</a>
</div>
