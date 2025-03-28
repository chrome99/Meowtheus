<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
	import type { MeowEvent } from '$lib/types.js';

	let meows = $state<MeowEvent[]>([]);
	let connected = $state(false);

	onMount(() => {
		const source = new EventSource('http://localhost:3000/meow/stream');

		source.onopen = () => {
			connected = true;
		};

		source.onmessage = (event) => {
			try {
				const meow = JSON.parse(event.data);
				meows = [...meows, meow];
			} catch (err) {
				console.error('Invalid meow data:', event.data);
			}
		};

		source.onerror = () => {
			connected = false;
		};

		onDestroy(() => {
			source.close();
		});
	});
</script>

<h1>🐱 Meowtheus</h1>

{#if !connected}
	<p>🔄 Connecting to meow stream...</p>
{:else if meows.length === 0}
	<p>🧘‍♂️ No meows yet. Enjoy the silence.</p>
{:else}
	<ul>
		{#each meows as { catId, timestamp }}
			<li>
				<strong>{catId}</strong> meowed at {new Date(timestamp).toLocaleTimeString()}
			</li>
		{/each}
	</ul>
{/if}
