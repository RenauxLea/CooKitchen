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
}

export const ListRecipes = ({ searchPhrase, setClicked, data }: ListProps) => {
  const renderItem = ({ item  }:any): ReactElement<any, string | JSXElementConstructor<any>> | null=> {
    // when no input, show all
    if (searchPhrase === "") {
       return <RecipeCard key={item.id} recipe={item} />
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <RecipeCard key={item.id} recipe={item} />

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