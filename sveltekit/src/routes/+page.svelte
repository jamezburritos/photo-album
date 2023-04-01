<script lang="ts">
	import '@fontsource/inter'
	import type { PageData } from './$types'
	import { Client, Query, Storage } from 'appwrite'
	import { crossfade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

	export let data: PageData

	// dynamically set number of columns in image grid
	let innerWidth: number
	$: columns = Math.floor(innerWidth / 350)

	// selected image popup
	let selected = -1

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
                transform: ${transform} scale(${t});
                opacity: ${t}
                `
			}
		}
	})

	// fetch images from storage bucket
	const client = new Client()
		.setEndpoint('http://localhost/v1')
		.setProject(data.projectID)

	const storage = new Storage(client)
	const images = storage.listFiles(data.bucketID, [Query.limit(100)])
	// TODO: add 'load mode' functionality

	const fetchImage = (fileID: string, quality: number) => {
		const url = storage.getFileView(data.bucketID, fileID)
		url.searchParams.set('quality', `${quality}`)
		return url.toString()
	}
</script>

<svelte:window bind:innerWidth />

<div
	id="gallery"
	style:columns
>
	{#await images}
		{#each new Array(10) as _}
			<figure class="gallery-item gallery-placeholder" />
		{/each}
	{:then images}
		{#each images.files as file, i (file.$id)}
			<img
				class="gallery-item"
				alt={file.name}
				src={fetchImage(file.$id, 25)}
				in:receive={{ key: file.$id }}
				out:send={{ key: file.$id }}
				on:click={() => (selected = i)}
				on:keypress={() => (selected = i)}
			/>
		{/each}
	{/await}
</div>

{#await images then images}
	{#if selected !== -1}
		<div
			id="image-container"
			on:click={() => {
				selected = -1
			}}
			on:keypress={() => {
				undefined
			}}
		>
			<figure id="image-focused">
				<img
					alt={images.files[selected].name}
					in:receive={{ key: images.files[selected].$id }}
					out:send={{ key: images.files[selected].$id }}
					src={fetchImage(images.files[selected].$id, 100)}
				/>
			</figure>
		</div>
	{/if}
{/await}

<style lang="scss">
	#gallery {
		/* columns set dynamically */
		gap: 8px;

		.gallery-item {
			width: 100%;

			object-fit: contain;
			object-position: center;
		}

		.gallery-placeholder {
			height: 350px;
			margin: 0 0 8px 0;

			background: linear-gradient(45deg, #bbb, #ccc);
		}
	}

	#image-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;

		background: rgba(#333, 0.5);

		#image-focused {
			width: 80%;
			height: 100%;
			max-width: 900px;
			margin: auto;

			display: block;

			img {
				width: 100%;
				height: 100%;

				object-fit: contain;
				object-position: center;
			}
		}
	}
</style>
