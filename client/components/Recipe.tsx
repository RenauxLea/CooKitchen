import React from "react";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    FlatList,
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
  

const renderItem =  ({item } : any) => {
    return <View>
        <Text>item.name</Text>
    </View>
} ;

export const Recipe = () => {
    const route : RouteProp<{ params: { recipe : RecipeType } }, 'params'> = useRoute();
    const {recipe} = route.params;
    
    const navigation = useNavigation();
    const [quantity, setQuantity] = React.useState(recipe.quantity);


   return (
    <SafeAreaView>
    <ScrollView  
     contentInsetAdjustmentBehavior="automatic"
     >
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={styles.title}>{firstLetterInUppercase(recipe.name)}</Text>
                {recipe.isFavorite ? 
                    <IsFavorite width={20}  height={20}/> 
                    : 
                    <IsNotFavorite style={styles.image } width={20}  height={20}/> 
                }
                <Text style={styles.title}>{getCategoryName(recipe.category)}</Text>

                <View style={styles.timeContainer}>
                        <ClockImage style={styles.image } width={20}  height={20}/>
                        <Text style={styles.time}>{recipe.preparationTime}min</Text>
                </View>
                <View  style={styles.timeContainer}>
                    <FourImage style={styles.image } width={20}  height={20}/>
                    <Text style={styles.time}>{recipe.cookingTime}min</Text>
                </View>
                <Text style={styles.time}>Pour combien de personnes ?</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={number  => setQuantity(number)}
                    value={quantity}
                    placeholder='2'
                    maxLength={10}
                />
                <Text style={styles.time}>Ingrédients: </Text>

                <FlatList
                    data={recipe.listIngredients}
                    renderItem={renderItem}
                    keyExtractor={(item :any) => item.id}  
                />
                <Text style={styles.time}>Description: </Text>
                <Text style={styles.time}>{recipe.description} </Text>

                <TouchableOpacity onPress={() => navigation.navigate('Nouvelle Recette' as never)} style={styles.button}>
                    <Text >J'ai préparé cette recette</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Nouvelle Recette' as never)} style={styles.button}>
                    <Text >Modifier cette recette</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Nouvelle Recette' as never)} style={styles.button}>
                    <Text >Supprimer cette recette</Text>
                </TouchableOpacity>
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
    input: {
        backgroundColor: 'white',
        marginTop: 10,
        color:"#000000",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10   
    },
    button: {
        elevation: 8,
        backgroundColor: "#FFCC29",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },

});