<script>
	import LightSwitch from '$lib/components/ui/light_switch/light_switch.svelte';
	import Auth from '../auth/Auth.svelte';
	import Button from '../button/button.svelte';
</script>

<nav class="flex items-center justify-between">
	<span>🔥 Project ৹ <b>HOME</b></span>
	<div class="flex items-center gap-2">
		<Auth />
		<LightSwitch />
	</div>
</nav>

<style>
	nav {
		/* TODO przestylować */
		border-bottom-width: 1px;
		border-style: dashed;
		border-color: var(--color-gray-500);
		margin: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
	}
</style>
