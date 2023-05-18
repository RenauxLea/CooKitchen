import { ResultSet, Transaction, openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'ingredientDatabase.db'});

/* permet de créer ou de modifiée la bdd de SQLite */
export const get_data =  (name:string, quantity:string ,category:string, preparationTime:string, cookingTime:string,linkedIngredients:any ,description:string, crud:string, id:string = '') => {
    const objDescription = JSON.stringify(linkedIngredients)
    //@ts-expect-error
    db.transaction(function (tx: Transaction) {
       var requete = ''
       if (crud == 'create') {
           requete = 'INSERT INTO recipes (name, quantity, category, preparationTime, cookingTime, linkedIngredients, description, favorite) VALUES (?,?,?,?,?,?,?,0)'               
       }else if(crud == 'update'){
        console.log('update');
        
           requete = 'UPDATE recipes SET name = ?, quantity = ?, category = ?, preparationTime = ?, cookingTime = ?, linkedIngredients = ?, description = ? WHERE id='+id
       }

        tx.executeSql(
          requete,
          [name, quantity, category, preparationTime, cookingTime, objDescription, description],
          (tx: Transaction, results: ResultSet) => {
            if (results.rowsAffected > 0) {
              console.log('Recette create');

            } else console.log('Recette reject');
          }
        );
      });
    
}