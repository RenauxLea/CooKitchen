import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import { IngredientLinkedType } from "../types/ingredient";
import { Illustration } from "./utils/Illustration";

export type PreparationIngredientCardprops = {
    ingredient : IngredientLinkedType, 
}
// Composant permettant d'afficher les ingrédients dont on a besoin pour une recette et ses informations
// dans le récapitulatif de la préparation de la recette
export const PreparationIngredientCard = (  {ingredient} : PreparationIngredientCardprops )  => { 
    return (
        <View style={styles.container}>
            {Illustration(ingredient.category, 80, 80)}
            <View style={styles.information}>
                <Text style={styles.title}>{ingredient.name}</Text>
                <Text style={styles.quantity}>{ingredient.quantityForRecipe} {(ingredient.unit !== undefined && ingredient.unit !== "aucune" ) ?? ingredient.unit}</Text>        
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        width: "40%",
        marginVertical: 20,
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        color: '#000000',
        fontWeight: "600",
    },
    information: {
        width: "100%",
        flexDirection: "column",
        alignItems:"center"
    },
    quantity: {
        fontSize: 16,
        color: '#000000',
        fontStyle: "italic",
        fontWeight: "400",
    },
  });

  