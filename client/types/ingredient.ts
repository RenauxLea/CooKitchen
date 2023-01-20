export type IngredientType = {
    id : string,
    name : string,
    quantity : number,
    category?: "vegetable" | "fruit" | "fish" | "meat" | "cereal" | "milkProduct" | "sweetProduct",
    unit? : "g" | "cl" ,
    expiration : Date,

}