"server only";
import { Product } from "@/interfaces/Types";
const fs = require('fs');
const path = require('path');

export const FetchToCache = () => {
    const filePath = path.join(process.cwd(), 'src', 'json', 'db.json');
    // REEADING THE FILE SYNC (AS A STRING)
    const jsonFile = fs.readFileSync(filePath, 'utf-8');
    // CHANGE THE FILE READED TO A JSON FILE
    const parsedJson = JSON.parse(jsonFile);
    // CREATING A MAP THAT CONTAIN A GROUP OF TYPES , EACH TYPE CONTAIN ARRAY OF PRODUCTS WITH SAME TYPE
    const groupTypes: Map<string | undefined, Product[]> =
        parsedJson?.products?.reduce((theNewMap: Map<string | undefined, Product[]>, currentProduct: Product) => {
            if (!theNewMap.has(currentProduct.type)) {
                theNewMap.set(currentProduct.type, []);
            }
            theNewMap?.get(currentProduct.type)?.push(currentProduct);
            return theNewMap;
        }, new Map<string | undefined, Product[]>());

    // cachedDT = groupTypes;
    // cachedProducts = parsedJson?.products;
    return { groupTypes, parsedJson }
}