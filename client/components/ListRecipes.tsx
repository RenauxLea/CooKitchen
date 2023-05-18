import React, { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { RecipeType } from "../types/recipe";
import { EmptyDataIngredient } from "./EmptyDataIngredient";
import { RecipeCard } from "./RecipeCard";

type ListProps = {
    searchPhrase : string,
    setClicked: Dispatch<SetStateAction<boolean>>,
    data : RecipeType[] ,
    filters: String[],
}

export const ListRecipes = ({ searchPhrase, setClicked, data, filters }: ListProps) => {
  const renderItem = ({ item  }:any): ReactElement<any, string | JSXElementConstructor<any>> | null=> {
    // when no input, show all
    if (searchPhrase === "") {
      if(filters?.length > 0){ // Si on a des filtres 
        if(filters.includes(item.category)){ // Si on a des filtres de catégories
          if(filters.includes("favorite") ){ 
            // Si on a le filtre "est favoris"
            if(item.isFavorite && item.isFavorite === 1){
              return <RecipeCard key={item.id} recipe={item} />
            }
          }
          else {
            return <RecipeCard key={item.id} recipe={item} />
          }
        }

        else if(!filters.includes("entree" ) // Si on a pas de filtres de catégories
              && !filters.includes("main" ) 
              && !filters.includes("dessert" ) 
              && !filters.includes("other" ) 
            ) {
          if(filters.includes("favorite")){
            if(item.isFavorite && item.isFavorite === 1){
              return <RecipeCard key={item.id} recipe={item} />
            }
          }
          
        }
      }
      else {
        console.log(item)
        return <RecipeCard key={item.id} recipe={item} />
      }
    }

    else {
    // filter of the name
      if(filters.length > 0){
        if(filters.includes(item.category)){
          if(filters.includes("favorite") ){ 
            // Si on a le filtre "favoris"
            if(item.isFavorite && item.isFavorite === 1){
              if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
                return <RecipeCard key={item.id} recipe={item} />
              }
            }
          }
          else {
            if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              return <RecipeCard key={item.id} recipe={item} />
            }
          }
        }
      
      
        else if(!filters.includes("entree" ) // Si on a pas de filtres de catégories
        && !filters.includes("dessert" ) 
        && !filters.includes("main" ) 
        && !filters.includes("other" ) 
         ) {
          if(filters.includes("favorite")){
            if(item.isFavorite && item.isFavorite === 1){
              if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
                return <RecipeCard key={item.id} recipe={item} />
              }
            }
          }
        }
      }
      else {
        if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
          return <RecipeCard key={item.id} recipe={item} />
        }
      }
    }
    return null
  
  };


  return (
    <SafeAreaView style={styles.list__container}>
      <View
        //@ts-expect-error
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
     
        <FlatList
          data={data}
          renderItem={renderItem}
          initialNumToRender={4}
          ListEmptyComponent={<EmptyDataIngredient/>}
          keyExtractor={(item) => item.id}
        />
    
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list__container: {
    marginBottom: 20,
    height: "65%",
    width: "100%",
    paddingBottom: 70
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
  },
 
});