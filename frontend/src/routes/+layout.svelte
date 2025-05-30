<script lang="ts">
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<ModeWatcher />
<Navbar />
{@render children()}
