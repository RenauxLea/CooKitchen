import React from "react";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
import { firstLetterInUppercase } from "./utils/FirstLetterInUppercase";
import { RecipeType } from "../types/recipe";
import { getCategoryName } from "./RecipeCard";

import IsFavorite from "../assets/images/isFavorite.svg";
import IsNotFavorite  from "../assets/images/isNotFavorite.svg";
import FourImage from "../assets/images/four.svg";
import ClockImage  from "../assets/images/clock.svg";

import { openDatabase } from "react-native-sqlite-storage";
import { IngredientLinkedType } from "../types/ingredient";
import { deleteRecipe } from "../../server/recipe/delete";
import { favorite } from "../../server/recipe/favorite";
import { recipeRemoveIngredients } from "../../server/recipe/removeIngredient";

var db = openDatabase({ name: 'ingredientDatabase.db'});
  

const renderItem =  (item  :any) => {
    return <View style={styles.ingredient}>
        <Text style={styles.quantity}>
            {item.item.quantityForRecipe} 
            { (item.item.unit !== undefined && item.item.unit !== "aucune") && item.item.unit}
        </Text>
        <Text style={styles.ingredientName}>{item.item.name}</Text>
    </View>
} ;

const getFavoriteIcon = (isFavorite: boolean) => {
    // SQLITE retourne 1 ou 0, remise à la mise en forme pour les icones
    isFavorite = isFavorite ? true : false;
    return (
        isFavorite === true ? 
            <IsFavorite style={styles.icon } width={30}  height={30}/> 
        : 
            <IsNotFavorite style={styles.icon } width={30}  height={30}/> 
    )
}

export const Recipe = () => {
    const route : RouteProp<{ params: { recipe : RecipeType } }, 'params'> = useRoute();
    const {recipe} = route.params; 

    const navigation = useNavigation();
    const [quantity, setQuantity] = React.useState(recipe.quantity);
    const [isFavorite, setIsFavorite] = React.useState(recipe.isFavorite)
    
    React.useEffect(() => {
        getFavoriteIcon(isFavorite)
    }, [isFavorite])

    // mettre à jour les favoris dans la bdd
    const updateFavorite = async (isFavorite : boolean) => {
        favorite(isFavorite,recipe.id)
        setIsFavorite(isFavorite)
    }


   return (
    <SafeAreaView>
    <ScrollView  
     contentInsetAdjustmentBehavior="automatic"
     >
        <View style={styles.container} >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{firstLetterInUppercase(recipe.name)}</Text>
                {/* permet de mettre la recette en favoris */}
                <Pressable onPress={async () => await updateFavorite(!isFavorite)}>
                    {getFavoriteIcon(isFavorite)}
                </Pressable>
            </View>
            <Text style={styles.category}>{getCategoryName(recipe.category)}</Text>
            <View style={styles.CookingAndPreparation}>
                <View style={styles.timeContainer}>
                        <ClockImage style={styles.image } width={20}  height={20}/>
                        <Text style={styles.time}>{recipe.preparationTime}min</Text>
                </View>
                <View  style={styles.timeContainer}>
                    <FourImage style={styles.image } width={20}  height={20}/>
                    <Text style={styles.time}>{recipe.cookingTime}min</Text>
                </View>
            </View>
            
            <Text style={styles.subtitle}>Ingrédients: </Text>
            {
                recipe.listIngredients.length > 0 ?
                    <FlatList
                        data={recipe.listIngredients}
                        renderItem={renderItem}
                        keyExtractor={(item :any) => item.id}  
                        scrollEnabled={false}
                    />
                :
                    <Text style={styles.description}>Aucun ingrédient lié </Text>
            }
                
            <Text style={styles.subtitle}>Description: </Text>
            <Text style={styles.description}>{recipe.description} </Text>
            {/* bouton permettant d'ouvrir le récapitulatif des ingrédients utilisés pour pouvoir retirer automatiquement les quantités du garde-manger  */}
            <TouchableOpacity 
                onPress={() => {
                    //recipeRemoveIngredients(recipe.quantity,quantity,recipe.listIngredients),
                    navigation.navigate('Recette Préparée' as never,  {recipe: recipe} as never)
                }
            } 
                style={styles.prepareButton}
            >
                <Text  style={styles.buttonText} >J'ai préparé cette recette</Text>
            </TouchableOpacity>
            {/* bouton pour naviguer vers la page d'éditon d'une recette */}
            <TouchableOpacity 
                onPress={() => navigation.navigate('Modifier Recette' as never, {recipe} as never)} 
                style={styles.editButton}>
                <Text style={styles.buttonText}>Modifier cette recette</Text>
            </TouchableOpacity>
             {/* bouton pour supprimer une recette */}
            <TouchableOpacity 
                onPress={async() => {
                    await deleteRecipe(recipe.id),
                    navigation.navigate('Mes Recettes' as never, {refetch: true} as never)
                }} 
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Supprimer cette recette</Text>
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
    titleContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    icon: {
        marginTop: 10
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFCC29',
        width: "90%"
    },
    category : {
        fontSize: 16,
        color: "#000000",
        fontStyle: "italic",
        fontWeight: "400"
    },
    CookingAndPreparation: {
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center"
    },
    timeContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: 30,
        marginRight: 30,
        marginVertical: 20
    },
    image: {
        marginBottom: 5
    },
    time: {
        fontSize: 14,
        color: '#000000',
    },
    quantityText: {
        textAlign: "center",
        fontSize: 16,
        color:"#000000",
        fontWeight: "400",
    },
    input: {
        backgroundColor: 'white',
        marginTop: 10,
        color:"#000000",
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 100,
        textAlign:"center",
        fontSize: 16
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "600",
        color:"#000000",
        paddingTop: 20,
    },
    prepareButton: {
        elevation: 8,
        backgroundColor: "#FFCC29",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 20,
        marginTop: 30  
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
    description: {
        fontWeight: "400",
        fontSize: 16,
        fontStyle: "italic",
        paddingTop: 10,
        color:"#000000",
        paddingBottom: 10
    },
    ingredient: {
        display: "flex",
        flexDirection: "row",
        width: "70%",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    quantity: {
        fontWeight: "300",
        fontSize: 16,
        fontStyle: "italic",
        color:"#000000",
    },
    ingredientName: {
        width: "70%",
        fontWeight: "400",
        fontSize: 16,
        color:"#000000",
    }

});