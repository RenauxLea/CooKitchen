import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { EmptyDataRecipe } from "./EmptyDataRecipe";
import { RecipeCard } from "./RecipeCard";
import { RecipeType } from "../types/recipe";
import { openDatabase } from "react-native-sqlite-storage";

const recipesFixtures  : RecipeType[]= [
  {
    id : "1",
    name: "Pizza avec du fromage et du bacon",
    isFavorite: true,
    category:  "main" ,
    preparationTime : "30",
    cookingTime : "45",
    quantity: "4",
    description : "Attention à ne pas la bruler !",
    listIngredients: []
  },
  {
    id : "2",
    name: "Tiramisu",
    isFavorite: false,
    category:  "dessert" ,
    preparationTime : "10",
    cookingTime : "25",
    quantity: "1",
    listIngredients: [
      {
        id : "1",
        name : "café",
        quantityForRecipe: "150",
        unit : "g"
      },
      {
        id : "2",
        name : "beurre",
        quantityForRecipe: "30",
        
      }
    ],
    description: "C'est trop bon les tiramisu !!"
  },
  {
    id : "3",
    name: "recette",
    isFavorite: true,
    preparationTime : "10",
    cookingTime : "25",
    quantity: "1",
    listIngredients: []
  },
  {
    id : "4",
    name: "entrée",
    category:"entree",
    isFavorite: true,
    preparationTime : "10",
    cookingTime : "25",
    quantity: "3",
    listIngredients: []
  }

]

const renderItem =  ({item } : any) =><RecipeCard key={item.key} recipe={item} /> ;


export const MyRecipes = () => {

var db = openDatabase({ name: 'ingredientDatabase.db'});
  

  const navigation = useNavigation();

  useEffect(() => {
    //@ts-expect-error
    db.transaction(function (txn) {
      txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='recipes'",
          [],
          function (tx :any, res: any) {
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
        <FlatList
        data={recipesFixtures}
        renderItem={renderItem}
        initialNumToRender={4}
        keyExtractor={(item :any) => item.id}
        maxToRenderPerBatch={4}
        ListEmptyComponent={<EmptyDataRecipe/>}
        style= {styles.flatList}
        />
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
  flatList: {
    height: "68%",
    marginBottom: 20,
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
    marginBottom: 10,
  },
 
});
