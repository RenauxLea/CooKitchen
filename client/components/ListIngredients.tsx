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
}

export const ListIngredients = ({ searchPhrase, setClicked, data }: ListProps) => {
  const renderItem = ({ item  }:any): ReactElement<any, string | JSXElementConstructor<any>> | null=> {
    // when no input, show all
    if (searchPhrase === "") {
       return <IngredientCard key={item.id} ingredient={item} />
    }
    // filter of the name
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <IngredientCard key={item.id} ingredient={item} />

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
    height: "55%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
  },
 
});