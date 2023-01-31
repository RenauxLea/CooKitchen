
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { format } from "date-fns";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { IngredientType } from "../types/ingredient";


export type IngredientCardprops = {
    ingredient : IngredientType, 
}

const getIllustration = (category  : string | undefined) : ImageSourcePropType => {
    let linkIllustration : string;
    switch (category) {
        case "vegetable":
            linkIllustration =  require("../assets/images/categories/ingredients/vegetable.png");
            break;
        case "fruit":
            linkIllustration =  require("../assets/images/categories/ingredients/fruit.png");
            break;
        case "fish":
            linkIllustration =  require("../assets/images/categories/ingredients/fish.png");
            break;
        case "meat":
            linkIllustration =  require("../assets/images/categories/ingredients/meat.png");
            break;
        case "cereal":
            linkIllustration =  require("../assets/images/categories/ingredients/cereal.png");
            break;
        case "milkProduct":
            linkIllustration =  require("../assets/images/categories/ingredients/milkProduct.png");
            break;
        case "sweetProduct":
            linkIllustration = require("../assets/images/categories/ingredients/sweetProduct.png");
            break;
        default:
            linkIllustration =  require("../assets/images/categories/ingredients/other.png");
            break;
    }
    return linkIllustration as ImageSourcePropType
}
const IngredientCard = (  {ingredient} : IngredientCardprops )  => {
    const navigation = useNavigation();
    const linkIllustration = getIllustration(ingredient.category);

    let expirationDate : string = "";
    if (ingredient.expiration !== undefined) {
        expirationDate = ingredient.expiration.getDate() +'/'+(ingredient.expiration.getMonth()+1)+'/'+ingredient.expiration.getFullYear();
    }
   
    return (
       
        <Pressable 
            style= {styles.item}
            onPress={() => navigation.navigate('Ingredient' as never, {ingredient: ingredient} as never )}
        >
            
            <Image style={styles.image} source={linkIllustration}></Image>
            <View style={styles.information}>
                <Text style={styles.title}>{ingredient.name}</Text>
                <Text style={styles.quantity}>Quantité: {ingredient.quantity} {ingredient.unit && ingredient.unit}</Text> 
                
                { ingredient.expiration && 
                    <View style={styles.expiration} > 
                        <Image style={styles.icon} source={require("../assets/images/peremption.png")}></Image> 
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
        width: 60,
        height: 60,
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
        width: 15,
        height: 15,
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
  