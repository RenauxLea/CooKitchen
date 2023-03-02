import React from "react";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Root, Popup } from 'react-native-popup-confirm-toast'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { RecipeType } from "../types/recipe";
import { PreparationIngredientCard } from "./PreparationIngredientCard";

export const Preparation = () => {
    const route : RouteProp<{ params: { recipe : RecipeType } }, 'params'> = useRoute();
    const {recipe} = route.params;
    
    const navigation = useNavigation();
    return (
        <View style={{flex:1}}>
        <ScrollView  
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}
        > 
        
            <Text style={styles.title}>Retirer les ingrédients du garde-manger ?</Text>

            <View style={styles.ingredientsContainer}>
                {
                    recipe.listIngredients.map((ingredient) => {
                        return <PreparationIngredientCard ingredient={ingredient}/>
                    })
                }
            </View>
        </ScrollView>
        <Root>
        <View style={{position:'absolute',bottom:0, left: 10, right: 10}}>
          <TouchableOpacity 
                onPress={() => 
                    Popup.show({
                        type: 'success',
                        title: '',
                        textBody:  "Les ingrédients ont été retiré du garde-manger avec succès",
                        okButtonStyle: {backgroundColor: '#FFCC29'},
                        buttonText: 'Ok',
                        callback: () => {
                            Popup.hide();
                             navigation.navigate('Mes Recettes' as never)
                        },
                        
                      })
                } 
                style={styles.prepareButton}>
                <Text style={styles.buttonText}>Retirer du garde-manger</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Garde-manger' as never)} 
                style={styles.button}>
                <Text style={styles.buttonText}>Aller au garde-manger</Text>
            </TouchableOpacity> 
        </View>
        </Root>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: "#FFFFFF",
        paddingHorizontal: 24,
    }, 
    title: {
        textAlign:"center",
        fontWeight: "700",
        fontSize: 24,
        color:"#000000",
        marginVertical: 30
    },
    ingredientsContainer: {
        display: "flex",
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        alignSelf: "center",
        paddingBottom: 200,
    },
    prepareButton: {
        elevation: 8,
        backgroundColor: "#FFCC29",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 10,
        marginTop: 30,
        bottom: 0
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
        color:"#000000",
    },
    button: {
        elevation: 8,
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#000000",
    },
   
});