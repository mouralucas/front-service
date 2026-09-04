import { Item } from "./Item";



export interface GetItemsByLocationQuery {
    getItemsByLocation: {
        locationId: number;
        locationName: string;
        items: Item[];
    }[]
}