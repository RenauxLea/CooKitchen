import { useNavigation } from "@react-navigation/native";
import React, {  useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal } from "react-native";
import { IngredientType } from "../types/ingredient";
import { EmptyDataIngredient } from "./EmptyDataIngredient";
import { openDatabase, ResultSet, Transaction } from "react-native-sqlite-storage";
import SearchBar from "./SearchBar";
import  { ListIngredients } from "./ListIngredients";
import { IngredientFilters } from "./IngredientFilters";
import Filter from '../assets/images/filter.svg';

var db = openDatabase({ name: 'ingredientDatabase.db',createFromLocation: 1});

export const Pantry = () => {
  const [listItem, setListItem] = useState<IngredientType[]>([]) 
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedFiltersInModal, setSelectedFiltersInModal]= React.useState<string[]>([])
  const [selectedFilters, setSelectedFilters]= React.useState<string[]>([])

  const onChange = (category : string, isSelected: boolean) => {
    if(!isSelected){
      setSelectedFiltersInModal(Array.from(new Set([...selectedFiltersInModal, category])))
    }
    else{
      const index = selectedFiltersInModal.indexOf(category)
      const newSelectedFilters = selectedFiltersInModal.filter((element) => element !== category)
      setSelectedFiltersInModal(newSelectedFilters)
    }
    
   
  } 
  
  useEffect(() => {
    //@ts-expect-error
    db.transaction((tx : Transaction) => {
      tx.executeSql(
        'SELECT * FROM ingredients',
        [],
        (tx : Transaction, results : ResultSet) => {
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
    
    const onCloseModal = (selectedFilters : string[]) => {
      setModalVisible(false)
      setSelectedFilters(selectedFilters)
    }

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
 
          <View style={styles.filters}>
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />

            <Pressable
                style={styles.buttonFilter}
                onPress={() => setModalVisible(true)}>
                <Filter style={{borderRadius: 10}} width={50} height={50} />
            </Pressable>

            <IngredientFilters 
              visible={modalVisible}
              onClose={onCloseModal}
              onChange={onChange} 
              selectedFiltersInModal={selectedFiltersInModal}            
            />
          </View>
        
        {listItem.length === 0 ? <EmptyDataIngredient/>: 
          <ListIngredients
            searchPhrase={searchPhrase}
            data={listItem}
            setClicked={setClicked}
            filters={selectedFilters}
          />
        }
      <View style={{position:'absolute',bottom:0, left: 10, right: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Nouvel Ingrédient' as never)} style={styles.button}>
          <Text style={styles.buttonText}>Ajouter un ingrédient</Text>
        </TouchableOpacity>
      </View>
      </View> 
            
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      color: "#FFFFFF",
      paddingHorizontal: 24,
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5
  },
  buttonFilter: {
    alignSelf: "center",
    marginLeft: 10 
  },
  button: {
    elevation: 8,
    backgroundColor: "#FFCC29",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 10,
    marginTop: 30,
    bottom: 0
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

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
});
