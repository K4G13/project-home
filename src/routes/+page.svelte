<script lang="ts">
    import DevTools from "$lib/components/DevTools.svelte";
    import Tile from "$lib/components/Tile.svelte"; 
    import TileContextMenu from "$lib/components/TileContextMenu.svelte";
    import { tilestore } from "$lib/stores/TileStore";
	import { send, receive } from '$lib/transitions';
	import { flip } from 'svelte/animate';

    let tiles = tilestore.data;
    $: tilesWithBtt = [...$tiles, {isBtt:true,id:0}];

    let tileContextMenuEl: HTMLElement;
    let tileContextMenu = { show: Boolean(false), x: Number(0), y: Number(0) };
    function handleTileRightClick(e: CustomEvent<{ tileId: number, x: number, y: number }>) {
        console.log(e.detail.tileId)

        tileContextMenu.x = e.detail.x;
        tileContextMenu.y = e.detail.y;

        tileContextMenu.show = true;
    }
    
</script>

<svelte:document on:click={ ()=>{if(tileContextMenu.show)tileContextMenu.show=false} }/>
<div bind:this={tileContextMenuEl} class=''>
    {#if tileContextMenu.show}
    <TileContextMenu x={tileContextMenu.x} y={tileContextMenu.y}/>
    {/if}
</div>

<DevTools/>

<ul class="flex flex-wrap gap-[10px] m-[10px]">

    {#each tilesWithBtt as el (el.id)}
    <li in:receive={{key: el.id}} 
    out:send={{key: el.id}} 
    animate:flip={{ duration: 400 }}>

        {#if el.isBtt}
            <button class="grid h-[60px] w-[60px] place-items-center rounded-[12px] bg-[#FFFFFF30] font-semibold text-white m-[20px]
            backdrop-blur-[50px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.2)] " 
            on:click={()=>tilestore.add()}> + </button>
        {:else}
            <Tile data={el} on:tileRightClickEvent={handleTileRightClick}/>
        {/if}
            
    </li>
    {/each}

</ul>

