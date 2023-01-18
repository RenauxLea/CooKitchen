import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { HomepageCard } from "./HomepageCard";
  

export const Homepage = () => {
  
  return (
    <SafeAreaView>
       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <View style={styles.container}>
            <Text style={styles.title}>
                Bienvenue sur CooK<Text style={styles.titleYellow}>itchen</Text> ! 
            </Text>  
            <Text style={styles.subtitle}>
                L'application qui te permet de gérer ta cuisine facilement
            </Text>

            <HomepageCard 
                title={"Mes recettes"} 
                description={"Ajoute une recette"} 
                illustration={require("../assets/images/recipes.png")} 
                link={"Mes Recettes"} 
            /> 

            <HomepageCard 
                title={"Garde-manger"} 
                description={"Ajoute un aliment à ton garde-manger"} 
                illustration={require("../assets/images/pantry.png")}
                link={"Garde-manger"}                    
            /> 
           
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
    title: {
        fontSize: 32,
        fontWeight: '800',
       
        paddingTop: 20,
        color: "#000000",
    },
    titleYellow: {
        color: '#FFCC29'
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '400',
      color: "#000000",
    },
   
});
  