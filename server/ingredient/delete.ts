import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'ingredientDatabase.db'});

/* Supprimer un ingredient */
export const deleteIngredient = async(idIngredient : string) => {
    await (await db).transaction(function (txn) {
        txn.executeSql(
            // Recupérer l'id ainsi que la liste des recettes
            'SELECT id, linkedIngredients FROM recipes',
            [],
            (txn, results) => {
                var listRecipes = results.rows
                
                // 1-Parcours la liste des recettes
                for (let i = 0; i < listRecipes.length; i++) {
                    var thisListRecipe :any= [];
                    // 2 - Format String -> JSON
                    const thisRecipe = JSON.parse(listRecipes.item(i).linkedIngredients);
                    for (let j = 0; j < thisRecipe.length; j++) {
                        
                        // 3 - Si dans la liste, retirer l'ingredients
                        if(thisRecipe[j].id == idIngredient){
                            thisRecipe.splice(j,1)
                        }else{
                            thisListRecipe.push(thisRecipe[j])
                        }
                    }
                    // 4 - Format JSON -> String
                    var listRecipeStringify : string = JSON.stringify(thisListRecipe)
                    var idRecipe = JSON.stringify(listRecipes.item(i).id)
                    
                    txn.executeSql(
                        // 5 - Mise a jour des recettes afin de retiré l'ingredient
                        'UPDATE recipes SET linkedIngredients = ? WHERE id = ?',
                        [listRecipeStringify,idRecipe],
                        (txn,results) => {}
                    )

                }

                txn.executeSql(
                    // Supprimer l'un ingredient de la liste
                    'DELETE FROM ingredients WHERE id = ?',
                    [idIngredient],
                    (txn, results) => {}
                )
            }
        );
    });
}