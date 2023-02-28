import React from "react";
import { RouteProp, useRoute } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { firstLetterInUppercase } from "./utils/FirstLetterInUppercase";
import { RecipeType } from "../types/recipe";
  
const getCategoryName = (category : string | undefined) => {
    switch (category) {
        case "vegetable":
            return "Légume"
            break;
        case "fruit":
            return "Fruit"
            break;
        case "fish":
            return "Poisson"
            break;
        case "meat":
            return "Viande"
            break;
        case "cereal":
            return "Céréales"
            break;
        case "milkProduct":
            return "Produit laitier"
            break;
        case "sweetProduct":
            return "Aliment sucré"
            break;
        case "other":
            return "Autre"
            break;
        default:
            return "Aucune catégorie";
            break;
    }
}
export const Recipe = () => {
    const route : RouteProp<{ params: { recipe : RecipeType } }, 'params'> = useRoute();
    const {recipe} = route.params;



   return (
    <SafeAreaView>
    <ScrollView  
     contentInsetAdjustmentBehavior="automatic"
     >
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.title}>{firstLetterInUppercase(recipe.name)}</Text>
            </View>
          

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
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFCC29',
        paddingLeft: 10,
    },
    titleInformation: {
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 20,
        color: "#000000",   
    },
    information: {
        fontSize: 16,
        paddingBottom: 10,
        color: "#000000",
    },

});