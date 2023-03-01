export type IngredientType = {
    id : string,
    name : string,
    quantity : string,
    category?: "vegetable" | "fruit" | "fish" | "meat" | "cereal" | "milkProduct" | "sweetProduct" | "other",
    unit? : "g" | "cl" | "aucune" ,
    expiration ?: string,

}

export type IngredientLinkedType = {
    id: string,
    name : string,
    quantityForRecipe: string,
    category? :  "vegetable" | "fruit" | "fish" | "meat" | "cereal" | "milkProduct" | "sweetProduct" | "other",
    unit? : "g" | "cl" | "aucune" , 
}