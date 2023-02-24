import { useNavigation } from "@react-navigation/native";
 
import React, {  useState, useEffect } from "react";
import { TextInput, FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { IngredientType } from "../types/ingredient";
import { EmptyDataIngredient } from "./EmptyDataIngredient";
import { Ingredient as IngredientCard, IngredientCardprops } from "./IngredientCard";
import { openDatabase } from "react-native-sqlite-storage";

export const ingredientFixtures : IngredientType[]= [ 
  {
    id: "1",
    name: "maïs",
    quantity: 4,
    category: "cereal",
    // expiration: new Date(),
  },
  {
    id: "2",
    name: "banane",
    quantity: 6,
    category: "fruit",
    expiration: new Date(),
  },
  {
    id: "3",
    name: "poivrons",
    quantity: 200,
    unit: "g",
    category: "vegetable",
  },
  {
    id: "4",
    name: "beurre",
    quantity: 200,
    unit: "g",
    category: "milkProduct",
  },
  {
    id: "5",
    name: "steak",
    quantity: 500,
    unit: "g",
    category: "meat",
  },
  {
    id: "6",
    name: "vin blanc",
    quantity: 150,
    unit: "cl",
  },
  {
    id: "7",
    name: "saumon",
    quantity: 50,
    unit: "g",
    category: "fish"
  },


]
var db = openDatabase({ name: 'ingredientDatabase.db'});

// const ingredientFixtures  : IngredientType[]= []

const renderItem =  ({item } : any) =><IngredientCard key={item.key} ingredient={item} /> ;

const keyExtractor = (item :any) => item.id;

const ITEM_HEIGHT = 65; // fixed height of item component
const getItemLayout = (data : any, index : number) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * data.length,
    index,
  };
};


export const Pantry = () => {
  let [listItem, setListItem] = useState([])
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ingredients',
        [],
        (tx, results) => {
          console.log(results.rows.length);
          var list = results.rows.item;
          var listSQL = []
          for (let i = 0; i < results.rows.length; ++i){
            var sqlObj =   {
              id: list(i)['id'],
              name: list(i)['name'],
              quantity: list(i)['quantity'],
              category: list(i)['category'],
              expiration: list(i)['expiration'],
            }
            listSQL.push(sqlObj)
          }
          setListItem(listSQL)
          
        }
        
        );
      }
      ); 
    })
  console.log(listItem);
  
  const navigation = useNavigation();
  // const [searchValue, setSearchValue] = useState(""); // POUR LA RECHERCHE
  //  const [ingredients, setIngredients] = useState(ingredientFixtures)
  // const [arrayholder, setArrayholder] = useState(ingredientFixtures)
 
  // const searchFunction = (text :string)  => {
  //   const updatedData = arrayholder.filter((item) => {
  //     const item_data = `${item.name.toUpperCase()})`;
  //     const text_data = text.toUpperCase();
  //     return item_data.indexOf(text_data) > -1;
  //   });
  //   setIngredients(updatedData)
  //   setSearchValue(text)
  // };

 

  return (
    <SafeAreaView> 
      <View style={styles.container}> 
           <Text style={styles.title}>
                Garde-manger
            </Text>  
            <Text style={styles.subtitle}>
                Liste les ingrédients présents dans ta cuisine
            </Text>
          {/* <TextInput 
            style={styles.input}  
            editable
            placeholder='Salade, beurre, oeufs ...'
            maxLength={40}
            placeholderTextColor="black"
            // value={searchValue} // POUR LA RECHERCHE
            // onChangeText={searchFunction}
            
          > */
          }
          {
          /* </TextInput>     */
          }
          
        {/* {ingredients.length === 0 ? <EmptyData/>: // POUR LA RECHERCHE
          <FlatList
            data={ingredients}
            renderItem={renderItem}
            initialNumToRender={4}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            maxToRenderPerBatch={5}
            ListEmptyComponent={<EmptyData/>}
            style= {styles.flatList}
            />
       } */}
        
        {/*ingredientFixtures.length === 0 ? <EmptyData/>:
          <FlatList
            data={ingredientFixtures}
            renderItem={renderItem}
            initialNumToRender={4}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            maxToRenderPerBatch={5}
            ListEmptyComponent={<EmptyDataIngredient/>}
            style= {styles.flatList}
            />
       */}

        {listItem.length === 0 ? <EmptyData/>:
          <FlatList
            data={listItem}
            renderItem={renderItem}
            initialNumToRender={4}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            maxToRenderPerBatch={5}
            ListEmptyComponent={<EmptyData/>}
            style= {styles.flatList}
            />
       }

        <TouchableOpacity onPress={() => navigation.navigate('Nouvel Ingrédient' as never)} style={styles.button}>
          <Text style={styles.buttonText}>Ajouter un ingrédient</Text>
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

  flatList: {
    height: "70%",
    marginBottom: 20,
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
  input: {
    backgroundColor: 'white',
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
    
    color: "black",
    borderWidth: 0.2,
    borderRadius: 5
   },
});
