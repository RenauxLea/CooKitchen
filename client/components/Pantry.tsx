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
import FilterDisplay from '../assets/images/filterDisplay.svg'

var db = openDatabase({ name: 'ingredientDatabase.db',createFromLocation: 1});

export const Pantry = (refetch : boolean = false) => {
  const [listItem, setListItem] = useState<IngredientType[]>([]) 
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedFiltersInModal, setSelectedFiltersInModal]= React.useState<string[]>([])
  const [selectedFilters, setSelectedFilters]= React.useState<string[]>([])

  const onChange = (category : string, isSelected: boolean) => {
    // si isSelected est égal à false, ça veut dire qu'on a retiré ce filtre donc on le retire du tableau de filtres sélectionnés
    if(!isSelected){
      setSelectedFiltersInModal(Array.from(new Set([...selectedFiltersInModal, category])))
    }
    // à l'inverse on l'ajoute dans le tableau s'il est sélectionné
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
  },[refetch])
    
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
            {/* barre de recherche par nom */}
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
          {/*bouton permettant d'ouvrir la modal de filtre  */}
            <Pressable
                style={styles.buttonFilter}
                onPress={() => setModalVisible(true)}>
                <Filter style={{borderRadius: 10}} width={50} height={50} />
            </Pressable>
            {/* modal de filtre */}
            <IngredientFilters 
              visible={modalVisible}
              onClose={onCloseModal}
              onChange={onChange} 
              selectedFiltersInModal={selectedFiltersInModal}            
            />
          </View>
          {/* affichage d'un nombre de filtres actifs */}
            {selectedFilters !== undefined && selectedFilters.length > 0 &&
              <View style={styles.filterDisplay}>
                <FilterDisplay  width={15} height={15} />
                <Text style={styles.filterText}>{selectedFilters.length} filtre(s) actif(s)</Text> 
             </View>
            }
        
        {listItem.length === 0 ? <EmptyDataIngredient/>: 
          <ListIngredients
            searchPhrase={searchPhrase}
            data={listItem}
            setClicked={setClicked}
            filters={selectedFilters}
          />
        }
      <View style={{position:'absolute',bottom:0, left: 10, right: 10}}>
        {/* bouton permettant de naviguer vers la page de création d'un nouvel ingrédient */}
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
  filterText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "500",
    paddingLeft: 5
  },
  filterDisplay: {
    display: "flex",
    flexDirection: "row",
    alignItems : "center"
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
