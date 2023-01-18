/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Homepage } from './client/components/Homepage';
import { MyRecipes } from './client/components/MyRecipes';
import { Pantry } from './client/components/Pantry';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil" screenOptions={{
     contentStyle:{
       backgroundColor:'#FFFFFF'
     }
  }}>
        <Stack.Screen name="Accueil" component={Homepage} />
        <Stack.Screen name="Mes Recettes" component={MyRecipes} />
        <Stack.Screen name="Garde-manger" component={Pantry} />
      </Stack.Navigator>
    </NavigationContainer> 
  );
};





export default App;
