import React from "react";
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
    isFavorite: true,
    category:  "dessert" ,
    preparationTime : "10",
    cookingTime : "25",
    quantity: "1",
    listIngredients: []
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
  const navigation = useNavigation();
  
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
