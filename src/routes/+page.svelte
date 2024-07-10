<script lang="ts">
    import Tile from "$lib/components/Tile.svelte"; 
    import DevTools from "$lib/components/DevTools.svelte";
    import type { tile_data } from "$lib/types.ts"; 
    import { tilestore } from "$lib/stores/TileStore";

    let tiles = tilestore.data;
    console.log(tiles);
    
</script>

<DevTools/>

<div class="flex flex-wrap">
{#each $tiles as el (el.id)}
    <Tile data={el}/>
{/each}
</div>

