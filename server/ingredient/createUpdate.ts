import moment from "moment";
import { Transaction, openDatabase } from "react-native-sqlite-storage";
import { Unit } from "../../client/types/ingredient";

var db = openDatabase({ name: 'ingredientDatabase.db'});

export const register_ingredients = async (name :string, quantity : string, category :string, unit : Unit, expirationDate : string, crud:string, id : string = '') => {
    if (expirationDate == moment(Date()).format("DD-MM-YYYY")) {
        expirationDate = ''
    }

    var requete = ''
       if (crud == 'create') {
           requete = 'INSERT INTO ingredients (name, quantity, category, unit, expiration) VALUES (?,?,?,?,?)'               
       }else if(crud == 'update'){        
           requete = 'UPDATE ingredients SET name = ?, quantity = ?, category = ?, unit = ?, expiration = ? WHERE id='+id
       }
    //@ts-expect-error
    db.transaction(function (tx) {
      tx.executeSql(
        /* 
            Creation Si vide -> other
            1 - recupérer les infos de category
            2 - regarder si infos n'est pas vide
            3 - SI vide alors == other
        */
        requete,
        [name, quantity, category, unit, expirationDate],
        (tx: Transaction, results: any) => {}
      );
    });
};