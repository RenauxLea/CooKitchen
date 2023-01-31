import React from "react";
import { RouteProp, useRoute } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { IngredientType } from "../types/ingredient";
  
export const Ingredient = () => {
    const route : RouteProp<{ params: { ingredient : IngredientType } }, 'params'> = useRoute();
    const {ingredient} = route.params;
   
   return (
    <SafeAreaView>
    <ScrollView  
     contentInsetAdjustmentBehavior="automatic"
     >
        <View >
            <Text style={styles.title}>page de l'ingrédient {ingredient.name}</Text>
        </View>
    </ScrollView>
    </SafeAreaView>
    
   );
  
}

const styles = StyleSheet.create({ 
    title: {
        fontSize: 12,
        fontWeight: '700',
        paddingTop: 20,
        color: "#000000",
    },
});