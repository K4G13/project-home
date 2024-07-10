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
    import RectangleIcon from "$lib/assets/icons/Rectangle.svg"
    import type { tile_data } from "$lib/types.ts";
    import { gsap } from "gsap";

    export let data: tile_data;

    function showTileAnimation(node:Node){
        const duration = 1;
        let tl = gsap.timeline();

        tl.from(node,{
            duration,
            opacity: 0,
            scale: 0
        }, `-=${duration * 0.75}`)

        return {
            /// GSAP's duration is in seconds. Svelte's is in miliseconds
            duration: tl.totalDuration() * 1000,
            tick: (t:number) => { tl.progress(t); }
        }
    }

</script>

<a href="/" class='tile' transition:showTileAnimation>

    <img src={RectangleIcon} alt="icon" height="60" width="60">
    [ { data.id<10 ? '0'+data.id : data.id } ]
    {data.title || "No Title"}

</a>
    


