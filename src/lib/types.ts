export interface TileData {
    id: number;
    isBtt?: boolean;
    title?: string;
    url?: string;
    icon_type?: "url" | "letter" | "default";
    icon_url?: string;
};