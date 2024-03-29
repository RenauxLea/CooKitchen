import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,   
  } from 'react-native';
import { HomepageCard } from "./HomepageCard";

export const Homepage = () => {
  return (
    <SafeAreaView>
       <ScrollView  style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        >
        <View>
            <Text style={styles.title}>
                Bienvenue sur CooK<Text style={styles.titleYellow}>itchen</Text> ! 
            </Text>  
            <Text style={styles.subtitle}>
                L'application qui te permet de gérer ta cuisine facilement
            </Text>

            {  /* card pour accéder aux recettes */}
            <HomepageCard 
                title={"Mes recettes"} 
                description={"Ajoute une recette"} 
                link={"Mes Recettes"} 
            /> 

            {  /* card pour accéder aux ingrédients */}
            <HomepageCard 
                title={"Garde-manger"} 
                description={"Ajoute un aliment à ton garde-manger"} 
                link={"Garde-manger"}                    
            /> 
            { /* card Admin */}
            {/*
            <HomepageCard 
                title={"Admin button sqlite"} 
                description={"update la bdd"} 
                link={"Admin button"}                    
            /> 
            */}
            
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
  