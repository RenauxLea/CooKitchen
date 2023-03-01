import React from "react";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { IngredientType } from "../types/ingredient";
import { firstLetterInUppercase } from "./utils/FirstLetterInUppercase";
import Supprimer from "../assets/images/supprimer.svg";
import PeremptionImage from '../assets/images/peremption.svg';
import { Illustration } from "./utils/Illustration";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'ingredientDatabase.db'});

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
export const Ingredient = () => {
    const route : RouteProp<{ params: { ingredient : IngredientType } }, 'params'> = useRoute();
    const {ingredient} = route.params;

    let expirationDate : string = "";
    if (ingredient.expiration !== undefined) {
        expirationDate = ingredient.expiration
    }

    const deleteIngredient = async() => {
        console.log("Long vie au roi !");
            await (await db).transaction(function (txn) {
                txn.executeSql(
                    // Supprimer entièrement la table
                    'DELETE FROM ingredients WHERE id = '+ingredient.id+'',
                    [],
                    (txn, results) => {
                        console.log("Adieux");
                }
              );
            });
    }

    const navigation = useNavigation();

   return (
    <SafeAreaView>
    <ScrollView  
     contentInsetAdjustmentBehavior="automatic"
     >
        <View style={styles.container} >
            <Pressable onPress={async() => {
                    await deleteIngredient(),
                    navigation.goBack()
                }
                }>
                <Supprimer style={styles.iconDelete}  width= {20} height= {20} />                
            </Pressable>
            <View style={styles.header}>
                {Illustration(ingredient.category, 40, 40) }
                <Text style={styles.title}>{firstLetterInUppercase(ingredient.name)}</Text>
            </View>
            <Text style={styles.titleInformation}>Catégorie:</Text>
            <Text style={styles.information}>{getCategoryName(ingredient.category)}</Text>
            <Text style={styles.titleInformation}>Quantité:</Text>
            <Text style={styles.information}>{ingredient.quantity} {ingredient.unit}</Text>
            <Text style={styles.titleInformation}>Date de péremption:</Text>
            { ingredient.expiration ?
                    <View style={styles.expiration} > 
                        <PeremptionImage style={styles.icon} width={20} height= {20}/>
                        <Text style={styles.expirationDate}>
                             {expirationDate}  
                             
                        </Text>  
                        
                    </View> : <View style={styles.expiration} > 
                        <PeremptionImage style={styles.icon} width={20} height= {20}/>
                        <Text style={styles.expirationDate}>Aucune date </Text>  
                    </View>
                }   

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
    image: {
        width: 40,
        height: 40,
        borderRadius: 10
    },
    expiration: {
        display: "flex",
        flexDirection: "row",  
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 3,   
    },
    iconDelete: {
        marginTop: 30,
        marginHorizontal: 10,
        display:"flex",
        alignSelf:"flex-end"
    },
    expirationDate: {
        fontSize: 16,
        fontWeight: "400",
        fontStyle: "italic",
        color: "black",
    }
});