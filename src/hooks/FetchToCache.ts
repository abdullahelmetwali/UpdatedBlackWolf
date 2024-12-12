"server only";
import { Product } from "@/interfaces/Types";
const fs = require("fs");
const path = require("path");

export const FetchToCache = () => {
    const filePath = path.join(process.cwd(), "src", "json", "db.json");

    // READ & PARSE JSON file 
    const parsedJson = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // MAKING A TYPE OF EACH ONE , AND PUT THEM IN ARRAY FOR THE TYPE
    const groupTypes = new Map<string | undefined, Product[]>();
    parsedJson.products.forEach((product: Product) => {
        if (!groupTypes.has(product.type)) {
            groupTypes.set(product.type, []);
        }
        groupTypes.get(product.type)?.push(product);
    });

    return { groupTypes, parsedJson };
};
