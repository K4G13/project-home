<script lang="ts">
    import DevTools from "$lib/components/DevTools.svelte";
    import Tile from "$lib/components/Tile.svelte"; 
    import TileContextMenu from "$lib/components/TileContextMenu.svelte";
    import { tilestore } from "$lib/stores/TileStore";
	import { send, receive } from '$lib/transitions';
	import { flip } from 'svelte/animate';

    let tiles = tilestore.data;
    $: tilesWithBtt = [...$tiles, {isBtt:true,id:0}];


    let showTileContextMenu: Boolean = false;
    let tileContextMenuX: number;
    let tileContextMenuY: number;
    function handleTileRightClick(e: CustomEvent<{ tileId: number, x: number, y: number }>) {
        console.log(e.detail.tileId)
        tileContextMenuX = e.detail.x;
        tileContextMenuY = e.detail.y;
        showTileContextMenu = true;       
        // tilestore.remove(e.detail.tileId); 
    }
    
</script>

<svelte:document on:click={ ()=>{if(showTileContextMenu)showTileContextMenu=false} }/>
{#if showTileContextMenu}<TileContextMenu x={tileContextMenuX} y={tileContextMenuY}/>{/if}

<DevTools/>

<ul class="flex flex-wrap gap-[10px] m-[10px]">

    {#each tilesWithBtt as el (el.id)}
    <li in:receive={{key: el.id}} 
    out:send={{key: el.id}} 
    animate:flip={{ duration: 400 }}>

        {#if el.isBtt}
            <button class="grid h-[60px] w-[60px] place-items-center rounded-[12px] bg-[#FFFFFF30] font-semibold text-white mt-[20px]
            backdrop-blur-[50px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.2)] " 
            on:click={()=>tilestore.add()}> + </button>
        {:else}
            <Tile data={el} on:tileRightClickEvent={handleTileRightClick}/>
        {/if}
            
    </li>
    {/each}

</ul>

