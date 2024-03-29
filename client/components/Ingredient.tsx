import React from "react";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { IngredientType } from "../types/ingredient";
import { firstLetterInUppercase } from "./utils/FirstLetterInUppercase";
import Supprimer from "../assets/images/supprimer.svg";
import PeremptionImage from '../assets/images/peremption.svg';
import { Illustration } from "./utils/Illustration";
import { openDatabase } from "react-native-sqlite-storage";
import { deleteIngredient } from "../../server/ingredient/delete";

var db = openDatabase({ name: 'ingredientDatabase.db'});

export const getCategoryIngredientByName = (category : string | undefined) => {
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

    const navigation = useNavigation();

   return (
    <SafeAreaView>
    <ScrollView  
     contentInsetAdjustmentBehavior="automatic"
     >
        <View style={styles.container} >
            <View style={styles.header}>
                {Illustration(ingredient.category, 40, 40) }
                <Text style={styles.title}>{ingredient.name && firstLetterInUppercase(ingredient.name)}</Text>
            </View>
            <Text style={styles.titleInformation}>Catégorie:</Text>
            <Text style={styles.information}>{getCategoryIngredientByName(ingredient.category)}</Text>
            <Text style={styles.titleInformation}>Quantité:</Text>
            <Text style={styles.information}>
                {
                    ingredient.quantity === undefined || ingredient.quantity=== "" ? "0" : ingredient.quantity
                } 
                {
                    (ingredient.unit === undefined || ingredient.unit === "aucune" ) ? "" : ingredient.unit
                }
            </Text>
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
            {/* Bouton permettant d'éditer un ingrédient */}
            <TouchableOpacity 
                onPress={() => navigation.navigate('Modifier Ingrédient' as never, {ingredient} as never)} 
                style={styles.editButton}>
                <Text style={styles.buttonText}>Modifier cet ingrédient</Text>
            </TouchableOpacity>
             {/* Bouton permettant de supprimer un ingrédient et de retourner sur la liste des ingrédients */}
            <TouchableOpacity 
                onPress={() => {
                    deleteIngredient(ingredient.id),
                    navigation.navigate('Garde-manger' as never, {refetch: true} as never)
                }}
                style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity> 
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
        marginTop: 30
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
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
        color:"#000000",
    },
    editButton: {
        elevation: 8,
        backgroundColor: "white",
        borderRadius: 10,
        marginTop:40,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#000000",
    },
    deleteButton: {
        elevation: 8,
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#F21616",
    },
    deleteButtonText: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
        color:"#F21616",
    },
});