import { ResultSet, Transaction, openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'ingredientDatabase.db'});

export const get_data =  (name:string, quantity:string ,category:string, preparationTime:string, cookingTime:string,linkedIngredients:any ,description:string, crud:string, id:string = '') => {
    const objDescription = JSON.stringify(linkedIngredients)
    //@ts-expect-error
    db.transaction(function (tx: Transaction) {
        /* 
            Creation Si vide -> other
            1 - recupérer les infos de category
            2 - regarder si infos n'est pas vide
            3 - SI vide alors == other
        */
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