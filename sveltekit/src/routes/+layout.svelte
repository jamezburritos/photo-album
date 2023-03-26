<script lang="ts">
import "@fontsource/inter";
	import type { LayoutData } from "./$types";

export let data: LayoutData;
</script>

<title>photo album</title>

<nav> 
    <h1>photo album</h1>
    <img id="profile"
         alt=""
         src={data.avatar}/>
</nav>

<slot/>

<style lang="scss">
    :global(body) {
        margin: 0;
        padding: 102px 32px 0px;

        background: #efefef;
    }

    :global(h1, h2, h3, p) {
        margin: 0;

        font-family: 'Inter', sans-serif;
        color: #333;
    }

    h1 { font-weight: 500; }

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
        }
    }
</style>
