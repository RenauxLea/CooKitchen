import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
  } from 'react-native';
  

export const Pantry = () => {
  
  return (
    <SafeAreaView>
       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
        <View>
            <Text>page garde-manger </Text>  
        </View>
      </ScrollView> 
     
    </SafeAreaView>
  );
}