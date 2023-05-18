import { openDatabase } from "react-native-sqlite-storage";
import { RecipeType } from "../../client/types/recipe";

var db = openDatabase({ name: 'ingredientDatabase.db'});

export const recipeRemoveIngredients = async(listIngredients : RecipeType["listIngredients"]) =>{
    // recupère l'ensemble des informations des ingredients
    (await db).transaction(function (txn) {
        txn.executeSql(
            'SELECT * FROM ingredients',
            [],
            (txn,results) => {
                // ingredientsRecipe = Liste des ingredients
                var ingredientsRecipe : any = listIngredients;
                
                var frigo :any =  results.rows
                
                for (let i = 0; i < ingredientsRecipe.length; i++) {
                    for (let j = 0; j < frigo.length; j++) {
                        const aliment = frigo.item(j);
                        //  SI la liste ne conrresont pas -> Passe
                        if (aliment.id != ingredientsRecipe[i].id && ingredientsRecipe.length) {
                            continue;
                        }else{
                            //correspondance -> Verification de la quantité dans le frigo + update BDD
                            var newQteFrigo :number   = ingredientsRecipe[i].quantityForRecipe
                            // Si quantité insuffisante, Qte dans le frigo = 0 
                            if (aliment.quantity < newQteFrigo) {
                                newQteFrigo = 0
                            }else{
                                newQteFrigo = aliment.quantity - newQteFrigo
                            }
                            /* Mise a jour du frigo */
                            txn.executeSql(
                                'UPDATE ingredients SET quantity = ? WHERE id = ?',
                                [newQteFrigo, aliment.id],
                                (txn,results) => {
                                }
                            )
                            
                        }
                        
                    }
                    
                }
            }
        )
    })
}