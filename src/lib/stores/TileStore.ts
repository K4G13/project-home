import { ViteRuntime } from "vite/runtime";
import type { tile_data } from "../types";
import { writable } from 'svelte/store';
import type { Subscriber } from "svelte/motion";

class TilestoreClass {

    data = writable<tile_data[]>();    

    constructor() {
        this.data.set([
            { id: 1, title: "ABC" }, 
            { id: 2, title: "XYZ" }, 
            { id: 3 },
        ]);
    } 
    
    subscribe(run:Subscriber<tile_data[]>) {
        return this.data.subscribe(run);
    }

    add(){
        this.data.update(data => {
            let max = Math.max(...data.map(d => d.id));
            data.push({ id: max+1, title: "New" });
            console.log(data)
            return data;
        });
    }

    remove(id:number){
        this.data.update(data => {
            data = data.filter(d => d.id!= id);
            return data;
        });
    }


}

export const tilestore = new TilestoreClass();