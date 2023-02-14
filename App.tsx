/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {Homepage}  from './client/components/Homepage';
import  {MyRecipes}  from './client/components/MyRecipes';
import { Pantry } from './client/components/Pantry';
import { Ingredient } from './client/components/Ingredient';
import { CreateIngredient } from './client/components/CreateIngredient';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
     contentStyle:{
       backgroundColor:'#FFFFFF'
     }}}
     
  >
        <Stack.Screen name="Accueil" component={Homepage} />
        <Stack.Screen name="Mes Recettes" component={MyRecipes} />
        <Stack.Screen name="Garde-manger" component={Pantry} />
        <Stack.Screen name="Ingredient" component={Ingredient} />
        <Stack.Screen name="Nouvel Ingrédient" component={CreateIngredient} />

      </Stack.Navigator>
    </NavigationContainer> 
  );
};





export default App;
