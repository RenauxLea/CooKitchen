import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';

export const CreateIngredient = () => { 
   return (
    <SafeAreaView>
        <ScrollView  
        contentInsetAdjustmentBehavior="automatic"
        > 
            <View >
                <Text style={styles.title}>page de création d'un ingrédient</Text>
                
            </View>
        </ScrollView>
    </SafeAreaView> 
   );
}

const styles = StyleSheet.create({    
    title: {
        fontSize: 12,
        fontWeight: '700',
        paddingTop: 20,
        color: "#000000",
    },
});