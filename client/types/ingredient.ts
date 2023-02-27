export type IngredientType = {
    id : string,
    name : string,
    quantity : number,
    category?: "vegetable" | "fruit" | "fish" | "meat" | "cereal" | "milkProduct" | "sweetProduct",
    unit? : "g" | "cl" ,
    expiration ?: string,

}

export type IngredientLinkedType = {
    id: string,
    name : string,
    quantityForRecipe: number,
    category? :  "vegetable" | "fruit" | "fish" | "meat" | "cereal" | "milkProduct" | "sweetProduct" | "other",
    unit? : "g" | "cl" , 
}