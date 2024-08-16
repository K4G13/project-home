<script>
    import DefIcon from "$lib/assets/icons/Rectangle.svg" 
    export let x = 0;
    export let y = 0;
</script>


<style type="postcss">

    :root{
        --x: 0px;
        --y: 0px;
    }

    ul{@apply         
        bg-white rounded-[6px] px-[8px] py-[8px] gap-[4px] text-[#111] inline-flex flex-col
        shadow-[0px_0px_15px_0px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.2)] absolute z-50;
        left: var(--x);
        top: var(--y);
    }

    button{@apply 
        flex bg-white place-items-center gap-[8px] px-[10px] rounded-[4px] w-full;
    }

    img{@apply
        size-[14px];
    }

    button:hover{@apply
        bg-[#111111] text-white;
    }
    button:hover img{@apply
        brightness-0 invert;
    }
    
</style>


<ul style="--x:{x}px;--y:{y}px" on:contextmenu|preventDefault>

    <li>
        <button>
            <img src={DefIcon} alt="" > <span>Open in new tab</span>
        </button>
    </li>

    <li>
        <button>
            <img src={DefIcon} alt=""> <span>Open in this tab</span>
        </button>
    </li>

    <li>
        <button>
            <img src={DefIcon} alt=""> <span>Edit tile</span>
        </button>
    </li>

    <li>
        <button>
            <img src={DefIcon} alt=""> <span>Delete tile</span>
        </button>
    </li>

</ul>