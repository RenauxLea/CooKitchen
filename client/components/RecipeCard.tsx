
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RecipeType } from "../types/recipe";
import { IllustrationRecipe } from "./utils/Illustration";
import FourImage from "../assets/images/four.svg";
import ClockImage  from "../assets/images/clock.svg";

export type RecipeCardProps = {
    recipe : RecipeType, 
}

export const getCategoryName = (category : string | undefined) => {
    switch (category) {
        case "main":
            return "Plat de résistance"
            break;
        case "entree":
            return "Entrée"
            break;
        case "dessert":
            return "Dessert"
            break;
        default:
            return "";
            break;
    }
}

export const RecipeCard = (  {recipe} : RecipeCardProps )  => {
    
    const navigation = useNavigation();
    console.log(recipe);
    return (
       
        <Pressable 
            style= {styles.item}
            onPress={() => navigation.navigate('Recette' as never, {recipe: recipe} as never )}
        >
            {/* appel à la fonction pour afficher la bonne illustration selon la catégorie */}
            {IllustrationRecipe(recipe.category)}
            <View style={styles.information}>
                <Text style={styles.title}>{recipe.name}</Text>
                {/* appel à la fonction pour connaitre le nom de la catégorie d'après son id */}
                <Text style={styles.category}>{getCategoryName(recipe.category)}</Text>
                <View style={styles.containerInformation}>
                    {/* s'il y a un temps de cuisson nous l'affichons ainsi qu'une icône associée */}
                    { recipe.preparationTime && 
                        <View style={styles.timeContainer}>
                            
                            <ClockImage style={styles.image } width={20}  height={20}/>
                            <Text style={styles.time}>{recipe.preparationTime}min</Text>
                        </View>
                    } 
                     {/* s'il y a un temps de préparation nous l'affichons ainsi qu'une icône associée */}
                   
                    { recipe.cookingTime &&  
                        <View  style={styles.timeContainer}>
                            <FourImage style={styles.image } width={20}  height={20}/>
                            <Text style={styles.time}>{recipe.cookingTime}min</Text>
                        </View>
                    }
                </View>
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
        borderRadius: 10,
        alignItems: "center"
        
    },
    title: {
        fontSize: 20,
        color: '#000000',
        fontWeight: "700",
    },
    containerInformation: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
    },
    timeContainer: {
        display: "flex",
        flexDirection: "row"
    },
    image: {
        marginRight: 3
    },
    time: {
        fontSize: 12,
        color: '#000000',
        paddingRight: 20
    },
    category: {
        fontSize: 14,
        color: '#000000',
        fontStyle: "italic",
        fontWeight: "300",
        
    },
    information: {
        width: "70%",
        flexDirection: "column",
        marginLeft: 10,
        paddingTop: 5
    },
    icon: {     
        marginRight: 3
    },

  
  });

  