<script lang="ts">
	import type { PageData } from './$types'
	import { scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import { Client, Query, Storage, type Models } from 'appwrite'

	// server-side page data
	export let data: PageData

	// page bindings
	let windowWidth: number
	let windowHeight: number
	let galleryHeight: number
	let scrollY: number

	// appwrite server access
	const client = new Client()
		.setEndpoint('http://localhost/v1')
		.setProject(data.projectID)

	const storage = new Storage(client)

	// dynamically set number of columns in image grid
	$: columns = Math.floor(windowWidth / 350)

	// selected image for modal
	let selected: Models.File | null

	// number of images in the bucket, used for batched loading
	let total = 0
	let loaded = 0

	// fetch a batch of image data from the server, updating counts as needed
	const fetchImageBatch = async (count: number): Promise<Models.File[]> => {
		const res = await storage.listFiles(data.bucketID, [
			Query.limit(count),
			Query.offset(loaded)
		])

		total = res.total
		loaded += res.files.length

		return res.files
	}

	// fetch the raw image url from the server, at a fixed quality
	const fetchImage = (fileID: string, quality: number): string => {
		const url = storage.getFileView(data.bucketID, fileID)
		url.searchParams.set('quality', `${quality}`)
		return url.toString()
	}

	// batches of image urls
	let batches = [fetchImageBatch(25)]

	// load more images when user approaches the bottom of the page
	$: {
		if (windowHeight + scrollY >= galleryHeight * 0.8 && loaded !== total) {
			batches = [...batches, fetchImageBatch(25)]
		}
	}
</script>

<svelte:window
	bind:innerWidth={windowWidth}
	bind:innerHeight={windowHeight}
	bind:scrollY
/>

<div
	id="gallery"
	style:grid-template-columns="repeat({columns}, 1fr)"
	bind:offsetHeight={galleryHeight}
>
	{#each batches as batch}
		{#await batch}
			{#each new Array(25) as _}
				<figure class="gallery-item gallery-placeholder" />
			{/each}
		{:then images}
			{#each images as file (file.$id)}
				<img
					class="gallery-item"
					alt={file.name}
					src={fetchImage(file.$id, 25)}
					loading="lazy"
					on:click={() => (selected = file)}
					on:keypress={() => (selected = file)}
				/>
			{/each}
		{/await}
	{/each}
</div>

{#await batches then images}
	{#if selected}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="image-container"
			on:click={() => {
				selected = null
			}}
		>
			<figure id="image-focused">
				<img
					alt={selected.name}
					src={fetchImage(selected.$id, 100)}
					transition:scale={{ easing: quintOut, duration: 200 }}
				/>
			</figure>
		</div>
	{/if}
{/await}

<style lang="scss">
	#gallery {
		display: grid;
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
