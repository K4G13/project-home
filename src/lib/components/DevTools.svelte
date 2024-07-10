<script>
    import { tilestore } from "$lib/stores/TileStore";
    let selected_id = 0 
</script>

<div class="absolute bottom-0 z-10 p-2 m-4 bg-white rounded-md shadow-lg">

    <input type="number" class="w-24" min="0" max="999" bind:value={selected_id} />
    <button class="font-medium text-red-600" on:click={()=>tilestore.remove(selected_id)}>DEL [-]</button>
    <button class="font-medium text-green-700" on:click={()=>tilestore.add()}>ADD [+]</button>

</div>

<style type="postcss">
    div > *{
        @apply shadow-[0px_0px_5px_2px_#00000030] rounded-md p-2;
    }
</style>