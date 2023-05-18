import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import { EmptyDataRecipe } from "./EmptyDataRecipe";
import { RecipeType } from "../types/recipe";
import { openDatabase, ResultSet, Transaction } from "react-native-sqlite-storage";
import SearchBar from "./SearchBar";
import { ListRecipes } from "./ListRecipes";
import Filter from '../assets/images/filter.svg';
import { RecipeFilters } from "./RecipeFilters";
import FilterDisplay from '../assets/images/filterDisplay.svg'

export const MyRecipes = (refetch : boolean = false) => {

  var db = openDatabase({ name: 'ingredientDatabase.db'});
  
  const [listRecipe, setListRecipe] = useState<RecipeType[]>([])
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

  // Quand on ferme la modal de filtre, on met à jour les filtres sélectionnés
  const onCloseModal = (selectedFilters : string[]) => {
    setModalVisible(false)
    setSelectedFilters(selectedFilters)
  }

  const navigation = useNavigation();

  useEffect(() => {
    // Création si empty
  
  //@ts-expect-error
  db.transaction(function (txn) {
      txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='recipes'",
          [],
          function (tx : Transaction, res: ResultSet) {
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS recipes', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS recipes( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTERGER, category TEXT, preparationTime TEXT, cookingTime TEXT, linkedIngredients BLOB, description TEXT, favorite INTERGER)',
                []
              );
              
            }
          }
        );
      }
    )

    //read liste
    //@ts-expect-error
    db.transaction(function (txn) {
      
      txn.executeSql(
        'SELECT * FROM recipes',
        [],
        (tx : Transaction, results : ResultSet) => {
          
          var list = results.rows.item;
          var listSQL : RecipeType[] = []
                    
          for (let i = 0; i < results.rows.length; ++i){
            let listIngredientsBdd = JSON.parse(list(i)['linkedIngredients'])
            let getDataIngredients = []
            for (let j = 0; j < listIngredientsBdd.length; j++) {
              const ingredientBdd = listIngredientsBdd[j];
              getDataIngredients.push(ingredientBdd)
            }
            
            
            var sqlObj = {
                id: list(i)['id'],
                name: list(i)['name'],
                category: list(i)['category'],
                isFavorite : list(i)['favorite'],
                preparationTime : list(i)['preparationTime'],
                cookingTime: list(i)['cookingTime'],
                quantity: list(i)['quantity'],
                listIngredients: getDataIngredients,
                description : list(i)['description']
              }
              listSQL.push(sqlObj)
              
            }
           
            setListRecipe(listSQL)
          }
        
        );
      }
  )
  },[])
  
  useEffect(() => {//@ts-expect-error
    db.transaction(function (txn) {
      
      txn.executeSql(
        'SELECT * FROM recipes',
        [],
        (tx : Transaction, results : ResultSet) => {
          
          var list = results.rows.item;
          var listSQL : RecipeType[] = []
                    
          for (let i = 0; i < results.rows.length; ++i){
            let listIngredientsBdd = JSON.parse(list(i)['linkedIngredients'])
            let getDataIngredients = []
            for (let j = 0; j < listIngredientsBdd.length; j++) {
              const ingredientBdd = listIngredientsBdd[j];
              getDataIngredients.push(ingredientBdd)
            }
            
            
            var sqlObj = {
                id: list(i)['id'],
                name: list(i)['name'],
                category: list(i)['category'],
                isFavorite : list(i)['favorite'],
                preparationTime : list(i)['preparationTime'],
                cookingTime: list(i)['cookingTime'],
                quantity: list(i)['quantity'],
                listIngredients: getDataIngredients,
                description : list(i)['description']
              }
              listSQL.push(sqlObj)
              
            }
           
            setListRecipe(listSQL)
          }
        
        );
      }
  )},[refetch])
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Liste des recettes</Text>  
        <Text style={styles.subtitle}>
          Quelle recette te ferait envie aujourd'hui ?
        </Text> 

        <View style={styles.filters}>
          {/* barre de recherche par nom */}
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />

          {/* bouton permettant d'ouvrir la modal de filtre */}
            <Pressable
                style={styles.buttonFilter}
                onPress={() => setModalVisible(true)}>
                <Filter style={{borderRadius: 10}} width={50} height={50} />
            </Pressable>

          {/* modal de filtre */}
            <RecipeFilters 
                visible={modalVisible} 
                onClose={onCloseModal} 
                onChange={onChange} 
                selectedFiltersInModal={selectedFiltersInModal}
            />
     
          </View>
            {selectedFilters !== undefined && selectedFilters.length > 0 &&
              <View style={styles.filterDisplay}>
                <FilterDisplay  width={15} height={15} />
                <Text style={styles.filterText}>{selectedFilters.length} filtre(s) actif(s)</Text> 
             </View>
            }
        
        {listRecipe.length === 0 ? <EmptyDataRecipe/>: 
          <ListRecipes
            searchPhrase={searchPhrase}
            data={listRecipe}
            setClicked={setClicked}
            filters={selectedFilters}
          />
        }

        <View style={{position:'absolute',bottom:0, left: 10, right: 10}}>
          {/* bouton permettant de naviguer vers la pae de création de recette */}
          <TouchableOpacity onPress={() => navigation.navigate('Nouvelle Recette' as never)} style={styles.button}>
            <Text style={styles.buttonText}>Ajouter une recette</Text>
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
    marginBottom: 10,
  },
 
});
