import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'ingredientDatabase.db'});


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