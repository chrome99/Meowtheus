<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { MeowEvent } from '$lib/types.js';

	let meows = $state<MeowEvent[]>([]);
	let connected = $state(false);
	let scrollContainer = $state<HTMLDivElement | null>(null);

	onMount(() => {
		const source = new EventSource('http://localhost:3000/meow/stream');

		source.onopen = () => {
			connected = true;
		};

		source.onmessage = (event) => {
			try {
				const meow: MeowEvent = JSON.parse(event.data);
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

	function scrollToBottom() {
		if (!scrollContainer) return;
		scrollContainer.scrollTo({
			top: scrollContainer.scrollHeight,
			behavior: 'smooth'
		});
	}

	$effect(() => {
		if (meows.length > 0) {
			scrollToBottom();
		}
	});
</script>

<main class="min-h-screen bg-zinc-950 text-white px-6 py-10 font-sans">
	<div class="max-w-2xl mx-auto">
		<h1 class="text-4xl font-bold mb-6 text-center tracking-tight">🐱 Meowtheus</h1>

		{#if !connected}
			<p class="text-zinc-400 text-center animate-pulse">🔄 Connecting to meow stream...</p>
		{:else if meows.length === 0}
			<p class="text-zinc-400 text-center">🧘‍♂️ No meows yet. Enjoy the silence.</p>
		{:else}
			<div
				bind:this={scrollContainer}
				class="max-h-[400px] overflow-y-auto space-y-4 pr-2"
				style="scrollbar-width: none;"
			>
				{#each meows as { catId, timestamp } (timestamp)}
					<div
						in:fly={{ y: 20, duration: 500 }}
						class="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow transition"
					>
						<div class="flex justify-between items-center">
							<span class="text-xl font-medium">{catId}: meow</span>
							<span class="text-sm text-zinc-400">
								{new Date(timestamp).toLocaleTimeString()}
							</span>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
