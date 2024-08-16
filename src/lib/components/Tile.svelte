<style type="postcss">

    .tile{ @apply
        grid
        h-[100px] w-[100px] 
        rounded-[12px] 
        bg-[#FFFFFF30] 
        backdrop-blur-[50px] 
        shadow-[0px_0px_15px_0px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.2)];
    }

    .tile img{
        filter: brightness(0) invert(1);
        @apply absolute place-self-center;
    }
    .tile:hover img{
        filter: none;
    }

</style>


<script lang="ts">
    import type { TileData } from "$lib/types.ts";
    import DefIcon from "$lib/assets/icons/Rectangle.svg" 
    import { createEventDispatcher } from 'svelte'


    export let data: TileData;

    const dispatch = createEventDispatcher()
    function handleClick(e:MouseEvent) {
        dispatch('tileRightClickEvent', { tileId: data.id, x: e.clientX, y: e.clientY })
    }

</script>

<a href="/" class='tile' on:contextmenu|preventDefault={handleClick}>

    <img src={DefIcon} alt="icon" height="60" width="60">
    [ { data.id<10 ? '0'+data.id : data.id } ]    
    {data.title || "No Title"}

</a>
    


