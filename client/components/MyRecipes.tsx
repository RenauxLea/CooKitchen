import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { EmptyDataRecipe } from "./EmptyDataRecipe";
import { openDatabase } from "react-native-sqlite-storage";

const recipesFixtures  : any= []

export const MyRecipes = () => {

var db = openDatabase({ name: 'ingredientDatabase.db'});
  

  const navigation = useNavigation();

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='recipes'",
          [],
          function (tx, res) {
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS recipes', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS recipes( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTERGER, category TEXT, preparationTime TEXT, cookingTime TEXT, linkedIngredients BLOB, description TEXT)',
                []
              );
              
            }
          }
        );
      }
    )
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM recipes',
        [],
        (tx : any, results : any) => {
          var list = results.rows.item;
          //var listSQL = []
          
          for (let i = 0; i < results.rows.length; ++i){
            let type = JSON.parse(list(i)['linkedIngredients'])
            for (let j = 0; j < type.length; j++) {
              const element = type[j];
              console.log(element['name']);
            }
            
            /*
            var sqlObj = {
                id: list(i)['id'],
                name: list(i)['name'],
                quantity: list(i)['quantity'],
                category: list(i)['category'],
                expiration: list(i)['expiration'],
              }
              listSQL.push(sqlObj)
              */
            }
            // @ts-expect-error
            //setListItem(listSQL)
          }
        
        );
      }
  )
  })
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des recettes</Text>  
        <Text style={styles.subtitle}>
          Quelle recette te ferait envie aujourd'hui ?
        </Text> 
      
        {recipesFixtures.length === 0 ? 
        <EmptyDataRecipe/>
        :
        <Text>la liste des recettes</Text>
       }

        <TouchableOpacity onPress={() => navigation.navigate('Nouvelle Recette' as never)} style={styles.button}>
          <Text style={styles.buttonText}>Ajouter une recette</Text>
        </TouchableOpacity>

      </View>  
    
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      color: "#FFFFFF",
      paddingHorizontal: 24,
  },
  button: {
    elevation: 8,
    backgroundColor: "#FFCC29",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "500",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFCC29',
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    color: "#000000",
  },
 
});
