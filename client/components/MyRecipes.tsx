import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { EmptyDataRecipe } from "./EmptyDataRecipe";

const recipesFixtures  : any= []

export const MyRecipes = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des recettes</Text>  
        <Text style={styles.subtitle}>
          Quelle recette te ferait envie aujourd-hui ?
        </Text> 
      
        {recipesFixtures.length === 0 ? 
        <EmptyDataRecipe/>
        :
        <Text>la liste des recettes</Text>
       }

        <TouchableOpacity onPress={() => navigation.navigate('Nouvelle Recette' as never)} style={styles.button}>
          <Text style={styles.buttonText}>Ajouter une recette</Text>
        </TouchableOpacity>

      </View>  
    
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      color: "#FFFFFF",
      paddingHorizontal: 24,
  },
  button: {
    elevation: 8,
    backgroundColor: "#FFCC29",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "500",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFCC29',
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    color: "#000000",
  },
 
});
