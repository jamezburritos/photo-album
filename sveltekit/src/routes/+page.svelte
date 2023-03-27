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

{#await images}
	<!-- make this less garbage -->
	<p>Loading...</p>
{:then images}
	<div
		id="gallery"
		style:columns
	>
		{#each images.files as file (file.$id)}
			<img
				class="gallery-item"
				alt={file.name}
				src={fetchImage(file.$id)}
			/>
		{/each}
	</div>
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
	}
</style>
