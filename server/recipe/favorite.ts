import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: 'ingredientDatabase.db'});

export const favorite = async (isFavorite : boolean , id : string) => {
    (await db).transaction(function(txn){
        txn.executeSql(
            'UPDATE recipes SET favorite = ? WHERE id = ?',
            [isFavorite,id],
            (txn,results) => {
                
            }
        )
    })
}