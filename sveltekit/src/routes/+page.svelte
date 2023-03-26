<script lang="ts">
import "@fontsource/inter";
import type { PageData } from "./$types";
import { Client, Storage } from "appwrite"

export let data: PageData;

const client = new Client()
    .setEndpoint("http://localhost/v1")
    .setProject(data.projectID);

const storage = new Storage(client);

const images = storage.listFiles(data.bucketID);

const fetchImage = (fileID: string) => {
    return storage.getFileView(data.bucketID, fileID).toString();
}
</script>

{#await images}
<!-- make this less garbage -->
<p>Loading...</p>
{:then images}
<div id="gallery"> 
    {#each images.files as file (file.$id)}
        <img class="gallery-item" 
             alt={file.name}
             src={fetchImage(file.$id)}/> 
    {/each}
</div>
{/await}

<style lang="scss">
    #gallery {
        columns: 5;
        gap: 8px;

        .gallery-item {
            width: 100%;
            
            object-fit: contain;
            object-position: center;
        }
    }

    @media only screen and (max-width: 1400px) {
        #gallery { columns: 4;}
    }

    @media only screen and (max-width: 1100px) {
        #gallery { columns: 3;}
    }

    @media only screen and (max-width: 900px) {
        #gallery { columns: 2;}
    }

    @media only screen and (max-width: 600px) {
        #gallery { columns: 1;}
    }
</style>
