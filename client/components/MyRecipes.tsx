import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { EmptyDataRecipe } from "./EmptyDataRecipe";
import { RecipeType } from "../types/recipe";
import { openDatabase, ResultSet, Transaction } from "react-native-sqlite-storage";
import SearchBar from "./SearchBar";
import { ListRecipes } from "./ListRecipes";

export const MyRecipes = () => {

  var db = openDatabase({ name: 'ingredientDatabase.db'});
  
  const [listRecipe, setListRecipe] = useState<RecipeType[]>([])
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // Création si empty
  
  //@ts-expect-error
  db.transaction(function (txn) {
      txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='recipes'",
          [],
          function (tx : Transaction, res: ResultSet) {
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS recipes', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS recipes( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTERGER, category TEXT, preparationTime TEXT, cookingTime TEXT, linkedIngredients BLOB, description TEXT, favorite)',
                []
              );
              
            }
          }
        );
      }
    )

    //read liste
    //@ts-expect-error
    db.transaction(function (txn) {
      
      txn.executeSql(
        'SELECT * FROM recipes',
        [],
        (tx : Transaction, results : ResultSet) => {
          var list = results.rows.item;
          var listSQL : RecipeType[] = []
          
          for (let i = 0; i < results.rows.length; ++i){
            let listIngredientsBdd = JSON.parse(list(i)['linkedIngredients'])
            let getDataIngredients = []
            for (let j = 0; j < listIngredientsBdd.length; j++) {
              const ingredientBdd = listIngredientsBdd[j];
              getDataIngredients.push(ingredientBdd)
            }
            
            
            var sqlObj = {
                id: list(i)['id'],
                name: list(i)['name'],
                category: list(i)['category'],
                isFavorite : list(i)['favorite'],
                preparationTime : list(i)['preparationTime'],
                cookingTime: list(i)['cookingTime'],
                quantity: list(i)['quantity'],
                listIngredients: getDataIngredients,
                description : list(i)['description']
              }
              listSQL.push(sqlObj)
              
            }
           
            setListRecipe(listSQL)
          }
        
        );
      }
  )
  },[listRecipe])
  
  console.log(listRecipe)
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des recettes</Text>  
        <Text style={styles.subtitle}>
          Quelle recette te ferait envie aujourd'hui ?
        </Text> 

        <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        
        {listRecipe.length === 0 ? <EmptyDataRecipe/>: 
          <ListRecipes
            searchPhrase={searchPhrase}
            data={listRecipe}
            setClicked={setClicked}
          />
        }

        <View style={{position:'absolute',bottom:0, left: 10, right: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Nouvelle Recette' as never)} style={styles.button}>
            <Text style={styles.buttonText}>Ajouter une recette</Text>
          </TouchableOpacity>
        </View>

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
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginTop: 30,
    bottom: 0
  },
  buttonText: {
    fontSize: 16,
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
    marginBottom: 10,
  },
 
});
