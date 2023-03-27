<script lang="ts">
	import '@fontsource/inter'
	import { fly } from 'svelte/transition'
	import { clickOutside } from '$lib/clickOutside'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	let optionsVisible: boolean
	const toggleUserOptions = () => {
        optionsVisible = !optionsVisible 
	}
</script>

<title>photo album</title>

<nav>
	<h1>photo album</h1>

    <!-- FIXME: double toggle when clicked and options are visible -->
	<img
		id="profile"
		alt=""
		on:click={toggleUserOptions}
		on:keypress={toggleUserOptions}
		src={data.avatar}
	/>

	{#if optionsVisible}
		<div
			id="user-options"
			transition:fly={{ duration: 200, x: 200 }}
			use:clickOutside
			on:click_outside={toggleUserOptions}
		>
			<h3>{data.name}</h3>
			<!-- TODO: add upload box -->
			<!-- TODO: preferences page-->
			<a href="/preferences">preferences</a>
			<button on:click={() => null}>upload</button>
			<a href="/logout">sign out</a>
		</div>
	{/if}
</nav>

<slot />

<style lang="scss">
	:global(body) {
		margin: 0;
		padding: 102px 32px 0px;

		background: #efefef;
	}

	:global(button) {
		all: unset;
		cursor: pointer;
	}

	:global(h1, h2, h3, p, a, button) {
		margin: 0;

		font-family: 'Inter', sans-serif;
		text-decoration: none;
		color: #333;

		transition: color 100ms linear;
	}

	:global(a:hover, button:hover) {
		color: #555;
	}

	h1 {
		font-size: 32px;
		font-weight: 500;

		cursor: default;
		user-select: none;
	}

	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 24px 32px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		background: #efefef;

		#profile {
			width: 40px;
			height: 40px;

			border-radius: 50%;

			background: grey;

			cursor: pointer;
		}

		#user-options {
			position: absolute;
			top: 0;
			right: 0;
			margin: 80px 32px;
			padding: 24px;

			display: flex;
			flex-direction: column;
			gap: 12px;

			background: #efefef;
			box-shadow: 0px 4px 16px -2px rgba(#333, 0.15);
		}
	}
</style>
