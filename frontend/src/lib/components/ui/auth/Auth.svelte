<script lang="ts">
	import Button from '../button/button.svelte';
	import Input from '../input/input.svelte';

	let logged = $state(false);
	let show_login_form = $state(true);
	let form_ref: HTMLFormElement | undefined = $state(undefined);
	let username: string = $state('undefined');
	let timer = $state(0);

	const login = () => {
		const form_data = new FormData(form_ref);
		const form_username = form_data.get('username');
		const form_password = form_data.get('password');

		fetch('http://localhost:3000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: form_username, password: form_password })
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) throw new Error(data.error);
				logged = true;
				show_login_form = false;
				username = data.username;
				start_timer(data.expires_in);
			})
			.catch((error) => {
				console.error('Error:', error.message);
			});
	};

	const logout = () => {
		logged = false;
		show_login_form = false;
	};

	let interval_id: ReturnType<typeof setInterval> | undefined;
	const start_timer = (seconds: number) => {
		timer = seconds;
		if (interval_id) clearInterval(interval_id);
		interval_id = setInterval(() => {
			timer--;
			if (timer === 0) {
				logout();
				if (interval_id) clearInterval(interval_id);
			}
		}, 1000);
	};
</script>

{#if !logged}
	{#if !show_login_form}
		<Button variant="outline" onclick={() => (show_login_form = true)}>sign in</Button>
	{:else}
		<form class="flex gap-2" bind:this={form_ref}>
			<Input type="text" name="username" placeholder="username" />
			<Input type="password" name="password" placeholder="password" />
			<div class="flex">
				<Button variant="outline" class="rounded-r-none" onclick={login}>log in</Button>
				<Button variant="outline" size="icon" class="rounded-l-none" onclick={() => (show_login_form = false)}>
					X
				</Button>
			</div>
		</form>
	{/if}
{:else}
	<Button variant="outline">logout in: {timer}</Button>
	<Button variant="outline" onclick={logout}>logout <b>{username}</b></Button>
{/if}
