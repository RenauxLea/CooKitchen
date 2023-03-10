import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  
export const EmptyDataIngredient = () => {
  return (
    <SafeAreaView>
       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <View style={styles.container}>
          <View style={styles.emptyState}>
            <Text style={styles.title}>Aucunes données trouvées</Text>  
            <Text style={styles.text}>Ajoute des ingrédients dans</Text> 
            <Text style={styles.text}>le garde-manger ou réinitialise</Text> 
            <Text style={styles.text}>les filtres</Text>  
          </View>
        </View>
      </ScrollView> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#FFFFFF",
    marginVertical: 0,  
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
    marginBottom: 10
  },
  text: {
    fontWeight: "400",
    fontSize: 16,
    color: "#000000",
    lineHeight: 23,
  },
  emptyState: {
    marginVertical: 40,
    borderRadius: 20,
    width: "100%",
    paddingVertical: 50,
    marginBottom: 180,
    backgroundColor: "#EEEDED",
    display: "flex",
    alignItems: "center"
  }
});