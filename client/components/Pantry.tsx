import { useNavigation } from "@react-navigation/native";
import React, {  useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { IngredientType } from "../types/ingredient";
import { EmptyDataIngredient } from "./EmptyDataIngredient";
import { Ingredient as IngredientCard, IngredientCardprops } from "./IngredientCard";
import { openDatabase } from "react-native-sqlite-storage";
import moment from "moment";
import SearchBar from "./SearchBar";
import  { ListIngredients } from "./ListIngredients";

export const ingredientFixtures : IngredientType[]= [ 
  {
    id: "1",
    name: "maïs",
    quantity: "4",
    category: "cereal",
    // expiration: new Date(),
  },
  {
    id: "2",
    name: "banane",
    quantity: "6",
    category: "fruit",
    expiration:  moment(new Date()).format("DD-MM-YYYY"),
  },
  {
    id: "3",
    name: "poivrons",
    quantity: "200",
    unit: "g",
    category: "vegetable",
  },
  {
    id: "4",
    name: "beurre",
    quantity: "200",
    unit: "g",
    category: "milkProduct",
  },
  {
    id: "5",
    name: "steak",
    quantity: "500",
    unit: "g",
    category: "meat",
  },
  {
    id: "6",
    name: "vin blanc",
    quantity: "150",
    unit: "cl",
  },
  {
    id: "7",
    name: "saumon",
    quantity: "50",
    unit: "g",
    category: "fish"
  },


]

var db = openDatabase({ name: 'ingredientDatabase.db',createFromLocation: 1});


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
  const [listItem, setListItem] = useState<IngredientType[]>([])

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    //@ts-expect-error
    db.transaction((tx : any) => {
      tx.executeSql(
        'SELECT * FROM ingredients',
        [],
        (tx : any, results : any) => {
          var list = results.rows.item;
          var listSQL = []
          for (let i = 0; i < results.rows.length; ++i){
            var sqlObj =   {
              id: list(i)['id'],
              name: list(i)['name'],
              quantity: list(i)['quantity'],
              category: list(i)['category'],
              unit: list(i)['unit'],
              expiration: list(i)['expiration'],
            }
            listSQL.push(sqlObj)
          }
          setListItem(listSQL)
          
        }
        
        );
      }
      ); 
    },[])
  
  const navigation = useNavigation();

  return (
    <SafeAreaView> 
      <View style={styles.container}> 
          <Text style={styles.title}>
              Garde-manger
          </Text>  
          <Text style={styles.subtitle}>
              Liste les ingrédients présents dans ta cuisine
          </Text>
         
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        
        {listItem.length === 0 ? <EmptyDataIngredient/>: 
          <ListIngredients
            searchPhrase={searchPhrase}
            data={listItem}
            setClicked={setClicked}
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
    fontSize: 16,
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
