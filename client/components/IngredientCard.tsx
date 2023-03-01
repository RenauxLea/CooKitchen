
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IngredientType } from "../types/ingredient";
import { openDatabase } from "react-native-sqlite-storage";
import PeremptionImage from '../assets/images/peremption.svg';
import { Illustration } from "./utils/Illustration";

export type IngredientCardprops = {
    ingredient : IngredientType, 
}

var db = openDatabase({ name: 'ingredientDatabase.db',createFromLocation: 1});

const IngredientCard = (  {ingredient} : IngredientCardprops )  => {
    

    const navigation = useNavigation();
    let expirationDate : string = "";
    if (ingredient.expiration !== undefined) { 
       expirationDate =  ingredient.expiration
     }
   
    return (
       
        <Pressable 
            style= {styles.item}
            onPress={() => navigation.navigate('Ingredient' as never, {ingredient: ingredient} as never )}
        >
            {Illustration(ingredient.category, 60, 60)}
            <View style={styles.information}>
                <Text style={styles.title}>{ingredient.name}</Text>
                <Text style={styles.quantity}>Quantité: {ingredient.quantity} {(ingredient.unit !== undefined && ingredient.unit !== "aucune" ) ?? ingredient.unit}</Text> 
                
                { ingredient.expiration && 
                    <View style={styles.expiration} > 
                        <PeremptionImage style={styles.icon} width={20} height= {20}/>
                        <Text style={styles.expirationDate}>
                             {expirationDate}             
                        </Text> 
                    </View>
                }     
            </View>
          
        </Pressable>
    )
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#EEEDED',
        padding: 10,
        marginTop: 15,
        flexDirection: "row",
        borderRadius: 10   
    },
    title: {
        fontSize: 18,
        color: '#000000',
        fontWeight: "600",
    },
    information: {
        width: "70%",
        flexDirection: "column",
        marginLeft: 10,
    },
    quantity: {
        fontSize: 12,
        color: '#000000',
        fontStyle: "italic",
    },

    expiration: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",   
    },

    icon: {     
        marginRight: 3
    },

    expirationDate: {
        fontSize: 12,
        fontWeight: "400",
        fontStyle: "italic",
        color: "black",
    }
  
  });

  export const Ingredient = React.memo(IngredientCard)
  