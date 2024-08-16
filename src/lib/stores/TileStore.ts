import type { TileData } from "../types";
import { writable } from 'svelte/store';
import type { Subscriber } from "svelte/motion";

class TileStore {

    data = writable<TileData[]>();    

    constructor() {
        this.data.set([
            { id: 1, title: "ABC" }, 
            { id: 2, title: "XYZ" }, 
            { id: 3 },
        ]);
    } 
    
    subscribe(run:Subscriber<TileData[]>) {
        return this.data.subscribe(run);
    }

    add(){
        this.data.update(data => {
            let max = Math.max(...data.map(d => d.id));
            max = Math.max(max, 0);
            data.push({ id: max+1, title: "New" });
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
export const tilestore = new TileStore();