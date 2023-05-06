import React, { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { IngredientType } from "../types/ingredient";
import { EmptyDataIngredient } from "./EmptyDataIngredient";
import {  Ingredient as IngredientCard } from "./IngredientCard";

type ListProps = {
    searchPhrase : string,
    setClicked: Dispatch<SetStateAction<boolean>>,
    data : IngredientType[] ,
    filters : string[],
}

export const ListIngredients = ({ searchPhrase, setClicked, data, filters }: ListProps) => {
  const renderItem = ({ item  }:any): ReactElement<any, string | JSXElementConstructor<any>> | null=> {
    // when no input, show all
    if (searchPhrase === "") {
      if(filters?.length > 0){ // Si on a des filtres 
        if(filters.includes(item.category)){ // Si on a des filtres de catégories
          if(filters.includes("outOfStock") ){ 
            // Si on a le filtre "rupture de stock"
            if(item.quantity && item.quantity <= 0){
              return <IngredientCard key={item.id} ingredient={item} />
            }
          }
          else if(filters.includes("inStock")){ 
            // Si on a le filtre "en stock"
            if(item.quantity && item.quantity > 0){
              return <IngredientCard key={item.id} ingredient={item} />
            }
          }  
          else {
            return <IngredientCard key={item.id} ingredient={item} />
          }
        }

        else if(!filters.includes("vegetable" ) // Si on a pas de filtres de catégories
              && !filters.includes("fruit" ) 
              && !filters.includes("fish" ) 
              && !filters.includes("meat" ) 
              && !filters.includes("cereal" ) 
              && !filters.includes("milkProduct")
              && !filters.includes("sweetProduct" )
              && !filters.includes("other" )) {
          if(filters.includes("outOfStock")){
            if(item.quantity && item.quantity <= 0){
              return <IngredientCard key={item.id} ingredient={item} />
            }
          }
          if( filters.includes("inStock")){ 
            // Si on n'a pas le filtre "rupture de stock" mais on a le filtre "en stock"
            if(item.quantity && item.quantity > 0){
              return <IngredientCard key={item.id} ingredient={item} />
            }
           }
        }
      }
      else {
        return <IngredientCard key={item.id} ingredient={item}/>
      }
    }
    else {
    // filter of the name
    if(filters.length > 0){
      if(filters.includes(item.category)){
        if(filters.includes("outOfStock") ){ 
          // Si on a le filtre "rupture de stock"
          if(item.quantity && item.quantity <= 0){
            if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              return <IngredientCard key={item.id} ingredient={item} />
            }
          }
        }
        else if(filters.includes("inStock")){ 
          // Si on a le filtre "en stock"
          if(item.quantity && item.quantity > 0){
            if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              return <IngredientCard key={item.id} ingredient={item} />
            }
           }
        }  
        else {
          if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <IngredientCard key={item.id} ingredient={item} />
          }
        }
      }
    
    
      else if(!filters.includes("vegetable" ) // Si on a pas de filtres de catégories
      && !filters.includes("fruit" ) 
      && !filters.includes("fish" ) 
      && !filters.includes("meat" ) 
      && !filters.includes("cereal" ) 
      && !filters.includes("milkProduct")
      && !filters.includes("sweetProduct" )
      && !filters.includes("other" )) {
        if(filters.includes("outOfStock")){
          if(item.quantity && item.quantity <= 0){
            if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
              return <IngredientCard key={item.id} ingredient={item} />
            }
          }
        }
      if( filters.includes("inStock")){ 
        // Si on n'a pas le filtre "rupture de stock" mais on a le filtre "en stock"
        if(item.quantity && item.quantity > 0){
          if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <IngredientCard key={item.id} ingredient={item} />
          }
        }
      }
      }
    }
    else {
      if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <IngredientCard key={item.id} ingredient={item} />
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