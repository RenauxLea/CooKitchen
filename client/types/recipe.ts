export type RecipeType = {
    id : string,
    name: string,
    isFavorite: boolean,
    category?: "dessert" | "main" | "entree" | "other",
    preparationTime : string,
    cookingTime : string,
    quantity: string,
    description? : string
    listIngredients: {
        id : string,
        name : string,
        quantityForRecipe: string,
        category?: "vegetable" | "fruit" | "fish" | "meat" | "cereal" | "milkProduct" | "sweetProduct" | "other",
        unit? : "g" | "cl" | "aucune" 
    }[]
}