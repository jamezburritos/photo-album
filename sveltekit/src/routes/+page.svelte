<script lang="ts">
	import '@fontsource/inter'
	import type { PageData } from './$types'
	import { Client, Storage } from 'appwrite'

	export let data: PageData

	// dynamically set number of cols in image grid
	let innerWidth: number
	$: columns = Math.floor(innerWidth / 350)

	// fetch images from storage bucket
	const client = new Client()
		.setEndpoint('http://localhost/v1')
		.setProject(data.projectID)

	const storage = new Storage(client)
	const images = storage.listFiles(data.bucketID)

	const fetchImage = (fileID: string) => {
		return storage.getFileView(data.bucketID, fileID).toString()
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
		{#each images.files as file (file.$id)}
			<img
				class="gallery-item"
				alt={file.name}
				src={fetchImage(file.$id)}
			/>
		{/each}
	{/await}
</div>

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
</style>
