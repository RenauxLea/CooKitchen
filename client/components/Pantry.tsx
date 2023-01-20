import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { IngredientType } from "../types/ingredient";
import { IngredientCard } from "./IngredientCard";

const ingredientFixture : IngredientType= {
  id: "1",
  name: "banane",
  quantity: 4,
  category: "cereal",
  expiration: new Date(),

}

export const Pantry = () => {
  
  return (
    <SafeAreaView>
       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <View style={styles.container}>
            <Text>page garde-manger </Text>  
            <IngredientCard ingredient={ingredientFixture}/>
        </View>
      </ScrollView> 
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      color: "#FFFFFF",
      paddingHorizontal: 24,
  },
});
