import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
  } from 'react-native';
  

export const MyRecipes = () => {
  
  return (
    <SafeAreaView>
       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <View>
         
            <Text>page mes recettes </Text>  
       
        </View>
      </ScrollView> 
     
    </SafeAreaView>
  );
}