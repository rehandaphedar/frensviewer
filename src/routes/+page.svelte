<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let website: string;
	let websites: string[] = [];

	const openWebsite = () => {
		goto(`/website/${website}`);
	};

	const initialiseWebsites = async () => {
		const res = await fetch('/api/websites');
		const json = await res.json();
		websites = json;
	};

	if (browser) {
		initialiseWebsites();
	}
</script>

<svelte:head>
	<title>frensviewer</title>
</svelte:head>

<h1 class="h1">frensviewer</h1>

<h2 class="h2">Open A Website</h2>
<form on:submit|preventDefault={openWebsite} class="form">
	<input
		list="websites"
		class="input"
		type="text"
		bind:value={website}
		placeholder="example.com"
		required
	/>
	<input class="btn" type="submit" value="Open" />
</form>

<datalist id="websites">
	{#each websites as website}
		<option value={website} />
	{/each}
</datalist>
