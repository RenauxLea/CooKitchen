import React, { useEffect, useState } from "react";
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
        name : "beurre salé et noix de coco",
        quantityForRecipe: "30",
        
      },  {
        id : "3",
        name : "café",
        quantityForRecipe: "150",
        unit : "g"
      },
      {
        id : "4",
        name : "beurre",
        quantityForRecipe: "30",
        
      },  {
        id : "5",
        name : "café",
        quantityForRecipe: "150",
        unit : "g"
      },
      
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
  
  let [listRecipe, setListRecipe] = useState<RecipeType[]>([])

  const navigation = useNavigation();

  useEffect(() => {
    //@ts-expect-error
    // Création si empty
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

    //read liste
    //@ts-expect-error
    db.transaction(function (txn) {
      
      txn.executeSql(
        'SELECT * FROM recipes',
        [],
        (tx : any, results : any) => {
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
  },[])
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des recettes</Text>  
        <Text style={styles.subtitle}>
          Quelle recette te ferait envie aujourd'hui ?
        </Text> 
      
        {listRecipe.length === 0 ? 
        <EmptyDataRecipe/>
        :
        <FlatList
        data={listRecipe}
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
