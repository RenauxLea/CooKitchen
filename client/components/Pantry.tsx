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

var db = openDatabase({ name: 'ingredientDatabase.db',createFromLocation: 1});

export const Pantry = () => {
  const [listItem, setListItem] = useState<IngredientType[]>([]) 
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedFiltersInModal, setSelectedFiltersInModal]= React.useState<string[]>([])
  const [selectedFilters, setSelectedFilters]= React.useState<string[]>([])

  const onChange = (category : string, isSelected: boolean) => {
    !isSelected ? setSelectedFiltersInModal([...selectedFiltersInModal, category]) : 
    setSelectedFiltersInModal(selectedFilters.splice(selectedFiltersInModal.indexOf(category), 1))
   
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
 
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />

          <Pressable
              style={styles.button}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.subtitle}>Show Modal</Text>
          </Pressable>
          <IngredientFilters 
          visible={modalVisible}
          onClose={onCloseModal}
          onChange={onChange} 
          selectedFiltersInModal={selectedFiltersInModal}            
          />
        
        {listItem.length === 0 ? <EmptyDataIngredient/>: 
          <ListIngredients
            searchPhrase={searchPhrase}
            data={listItem}
            setClicked={setClicked}
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
   overlayView: {
    flex: 1,
    position:'absolute',
    bottom:0, 
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%"
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
