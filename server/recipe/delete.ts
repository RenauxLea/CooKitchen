import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'ingredientDatabase.db'});

/* Supprimer une recette */
export const deleteRecipe = async(id : string) => {
        (await db).transaction(function (txn) {
            txn.executeSql(
                // Supprimer entièrement la table
                'DELETE FROM recipes WHERE id = '+id+'',
                [],
                (txn, results) => {}
          );
        });
}