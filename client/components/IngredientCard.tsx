
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IngredientType } from "../types/ingredient";
import { openDatabase } from "react-native-sqlite-storage";

import PeremptionImage from '../assets/images/peremption.svg';
import Vegetable from '../assets/images/categories/ingredients/vegetable.svg';
import Cereal from '../assets/images/categories/ingredients/cereal.svg';
import Fish from '../assets/images/categories/ingredients/fish.svg';
import Fruit from '../assets/images/categories/ingredients/fruit.svg';
import Meat from '../assets/images/categories/ingredients/meat.svg';
import MilkProduct from '../assets/images/categories/ingredients/milkProduct.svg';
import SweetProduct from '../assets/images/categories/ingredients/sweetProduct.svg';
import Other from '../assets/images/categories/ingredients/other.svg';



export type IngredientCardprops = {
    ingredient : IngredientType, 
}

var db = openDatabase({ name: 'ingredientDatabase.db',createFromLocation: 1});


export const Illustration = (category  : string | undefined, width : number,height : number)  => {
    switch (category) {
        case "vegetable":
            return <Vegetable style={styles.image} width={width} height={height} />
            break;
        case "fruit":
            return <Fruit style={styles.image} width={width} height={height} />
            break;
        case "fish":
            return <Fish style={styles.image} width={width} height={height} />
            break;
        case "meat":
            return <Meat style={styles.image} width={width} height={height} />
            break;
        case "cereal":
            return <Cereal style={styles.image} width={width} height={height} />
            break;
        case "milkProduct":
            return <MilkProduct style={styles.image} width={width} height={height} />
            break;
        case "sweetProduct":
            return <SweetProduct style={styles.image} width={width} height={height} />
            break;
        default:
            return <Other style={styles.image} width={width} height={height} />
            break;
    }
}
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
                <Text style={styles.quantity}>Quantité: {ingredient.quantity} {ingredient.unit && ingredient.unit}</Text> 
                
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
        justifyContent: "center"
    },
    image: {
        borderRadius: 10
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
  