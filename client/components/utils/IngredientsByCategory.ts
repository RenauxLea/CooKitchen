import { IngredientType } from "../../types/ingredient";

type IngredientsByCategoryPropstype= Array<{
    name :string,
    id : string,
    children: {name : string , id: string}[]
}>

// fonction permettant de triéer les ingrédients par catégorie pour le select d'ingrédients
export const IngredientsByCategory = (ingredients : IngredientType[]) : IngredientsByCategoryPropstype => {
    const categories = [
        {
            name : "Légumes",
            id: "vegetable",
            children: [] as {name : string , id: string}[]
        },
        {
            name : "Fruits",
            id: "fruit",
            children: []
        },
        {
            name : "Poissons",
            id: "fish",
            children: []
        },
        {
            name : "Viandes",
            id: "meat",
            children: []
        },
        {
            name : "Céréales",
            id: "cereal",
            children: []
        },
        {
            name : "Produits laitiers",
            id: "milkProduct",
            children: []
        },
        {
            name : "Aliments sucrés",
            id: "sweetProduct",
            children: []
        },
        {
            name : "Autre",
            id: "other",
            children: []
        },
    ]

    ingredients.forEach((ingredient : IngredientType) => {
        switch (ingredient.category) {
            case "vegetable":
                categories[0].children.push({name : ingredient.name, id: ingredient.id})
                break;
            case "fruit":
                categories[1].children.push({name : ingredient.name, id: ingredient.id})
                break;
            case "fish":
                categories[2].children.push({name : ingredient.name, id: ingredient.id})
                break;
            case "meat":
                categories[3].children.push({name : ingredient.name, id: ingredient.id})
                break;
            case "cereal":
                categories[4].children.push({name : ingredient.name, id: ingredient.id})
                break;
            case "milkProduct":
                categories[5].children.push({name : ingredient.name, id: ingredient.id})
                break;
            case "sweetProduct":
                categories[6].children.push({name : ingredient.name, id: ingredient.id})
                break;

            default:
                categories[7].children.push({name : ingredient.name, id: ingredient.id})
                break;
        }
    })

    return categories;
}