import React, { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
 } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { IngredientsByCategory } from "./utils/IngredientsByCategory";
import { IngredientLinkedType, IngredientType,  } from "../types/ingredient";
import { LinkedIngredientCard } from "./LinkedIngredientCard";
import { openDatabase, ResultSet, Transaction } from "react-native-sqlite-storage";
import { DropdownRecipe } from "./DropdownRecipe";
import { Pressable } from "react-native";

var db = openDatabase({ name: 'ingredientDatabase.db'});

const FlatListItemSeparator = () => {
    return (
      <View
        style={{
            height: 1,
            width: "70%",
            alignSelf: "center",
            margin: 15,
          backgroundColor: "#FFCC29",
        }}
      />
      );
  }
  
export const categories = [ 
      {name: "entrée", id: "entree"} ,
      {name: "plat de résistance", id:"main"},
      {name: "dessert", id:"dessert"},
      {name: "autre", id: "other"}
]

export const CreateRecipe = () => {

    const [name, setName] = React.useState('');
    const [category , setCategory] = React.useState<{name: string, id: string}>();
    const [preparationTime  , setPreparationTime ] = React.useState<{id: string, name : string}>();
    const [cookingTime   , setCookingTime  ] = React.useState("");
    const [quantity, setQuantity] = React.useState('');
    const [linkedIngredients, setLinkedIngredients] = React.useState<IngredientLinkedType[]>([]);
    const [description, setDesciption]= React.useState("");

    let [listIngredientBdd, setListIngredientBdd] = useState<IngredientType[]>([])
    useEffect( () => {
   
    //@ts-expect-error    
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM ingredients',
        [],
        (tx : Transaction , results : ResultSet ) => {
          const list = results.rows.item;
          let listSQL : IngredientType[]= []
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
          setListIngredientBdd(listSQL)
          
        }
        
        );
      }
      ); 
    },[])

    const linkedIngredientIds = linkedIngredients.map((item) => {
        return item.id
    })
    
    const ingredientsByCategories = IngredientsByCategory(listIngredientBdd)

    
    const navigation = useNavigation();
   

    const preparationTimeData = [
        {name : "15min", id: "15"},
        {name : "30min", id: "30"},
        {name : "45min", id: "45"},
        {name : "1h", id: "60"},
        {name : "1h30", id: "90"},
        {name : "plus de 1h30", id: "more"},
    ]

    // Modifié la qte d'un ingredient dans le tableau d'ingredient
    const onChangeQuantityRecipe = (qte : string, id : string) => {
        
        let newListIngredient : IngredientLinkedType[] = []
        linkedIngredients.forEach((element) => {
            let newQteIngredient =  {...element}
            if (id === element['id']) {
                newQteIngredient.quantityForRecipe = qte
            }
            newListIngredient.push(newQteIngredient)

        })
        
        setLinkedIngredients(newListIngredient)
        
    }

    const renderItem =  (item : any ) =>{
        console.log('Je suis : ',item.item.name);
        
        return <LinkedIngredientCard 
            id={item.item.id} 
            name={item.item.name} 
            quantityForRecipe={item.item.quantityForRecipe}
            unit={item.item.unit}
            onChangeQuantityRecipe={onChangeQuantityRecipe}
        />
    };

    const keyExtractor = (item :any) => item.id;

    const onSelectedIngredientsChange = (selectedItems : string[]) => {
        let ingredients : IngredientLinkedType[] = [];
        let listOnRecipe = linkedIngredients;
        
        listIngredientBdd.forEach((element) => {
            const isSelected = selectedItems.find( id => id === element['id'])
                if(isSelected) {
                    let getQuantityForRecipe = '0'
                    listOnRecipe.forEach(thisElementList => {
                        if (thisElementList['id'] == element['id'] && getQuantityForRecipe == '0') {
                            getQuantityForRecipe = thisElementList['quantityForRecipe']  
                        }
                    });
                    
                    ingredients.push( {
                            id : element['id'],
                            name : element['name'],
                            quantityForRecipe : getQuantityForRecipe,
                            category : element['category'],
                            unit : element['unit']
                        }
                    );
               }
            }    
        )
        setLinkedIngredients(ingredients);
      };

    const get_data =  () => {
        const objDescription = JSON.stringify(linkedIngredients)
        //@ts-expect-error
        db.transaction(function (tx: Transaction) {
            /* 
                Creation Si vide -> other
                1 - recupérer les infos de category
                2 - regarder si infos n'est pas vide
                3 - SI vide alors == other
            */
            tx.executeSql(
              'INSERT INTO recipes (name, quantity, category, preparationTime, cookingTime, linkedIngredients, description, favorite) VALUES (?,?,?,?,?,?,?,0)',
              [name, quantity, category?.id, preparationTime?.id, cookingTime, objDescription, description],
              (tx: Transaction, results: ResultSet) => {
                if (results.rowsAffected > 0) {
                  console.log('Recette create');
  
                } else console.log('Recette reject');
              }
            );
          });
        
    }

   return (
    <SafeAreaView>  
        <ScrollView  
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        > 
            <View style={styles.containerForm} >
                <Text style={styles.title}>Nouvelle recette</Text>
                <Text style={styles.subtitle}>Créé une nouvelle recette pour l’ajouter à la liste de tes recettes</Text>
                <Text style={styles.star}>*<Text style={styles.text}>Nom:</Text></Text>
                <TextInput
                    placeholder="gratin dauphinois"
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    defaultValue={name}
                />

                <Text style={styles.text}>Catégorie:</Text>

                <DropdownRecipe 
                    label={"Sélectionne une catégorie"} 
                    data={categories} 
                    onSelect={setCategory}
                    current = {category}
                />
   
                <Text style={styles.text}>Temps de préparation:</Text>
                <DropdownRecipe 
                    label={"Temps de préparation"} 
                    data={preparationTimeData} 
                    onSelect={setPreparationTime}
                    current={preparationTime}
                />
                

                <Text style={styles.text}>Temps de cuisson(en minutes):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={number  => setCookingTime(number)}
                    value={cookingTime}
                    placeholder='10'
                    maxLength={10}
                />

                <Text style={styles.text}>Nombre de personne(s):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={number  => setQuantity(number)}
                    value={quantity}
                    placeholder='2'
                    maxLength={10}
                />

                <Text style={styles.text}>Ingrédients:</Text>
                <SectionedMultiSelect
                    items={ingredientsByCategories}
                    // @ts-expect-error
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Ingrédients"
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={onSelectedIngredientsChange}
                    selectedItems={linkedIngredientIds}
                    styles={{
                        selectToggle: {
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingVertical: 10,
                            marginTop: 10,
                            paddingHorizontal: 10, 
                        },
                        confirmText: {
                            color: '#000000'
                        }

                    }}
                    colors={{ primary: '#FFCC29'  }}
                    noItemsComponent={<Text>Pas d'ingrédient disponible, veuillez en créer dans le garde-manger</Text>}
                    noResultsComponent={<Text>Aucun résultat</Text>}
                    searchPlaceholderText={"tomate, poivron..."}
                    confirmText={"Valider"}
                    showChips={false}
                    selectedText={"sélectionnés"}
                />
    
                {
                    linkedIngredientIds.length > 0 &&
                        <FlatList
                            data={linkedIngredients}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            ItemSeparatorComponent = { FlatListItemSeparator }
                            scrollEnabled={false}
                        />
                }
                
                <Text style={styles.text}>Description:</Text>
                <TextInput
                    style={styles.textarea}
                    placeholder='couper les pommes de terres ...'
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(text) => setDesciption(text)}
                    value={description}
                />
                
        </View>
        </ScrollView>
        <View style={{position:'absolute',bottom:0, left: 10, right: 10}}>
            <Pressable onPress={() => 
                (
                    get_data(),
                    navigation.navigate('Mes Recettes' as never)
                )
                } 
                style={name === "" || name === undefined ? styles.buttonDisabled : styles.buttonPrimary} 
                disabled={name === "" || name === undefined}

                >
                <Text style={name === "" || name === undefined ? styles.buttonDisabledText : styles.buttonPrimaryText}>Créer la recette</Text>

            </Pressable> 
        </View> 
    </SafeAreaView> 
   );
}

const styles = StyleSheet.create({    
    container: {
        color: "#FFFFFF",
        paddingHorizontal: 24,
    },
    containerForm: {
        paddingBottom: 100,
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
    text: {
        fontSize: 16,
        fontWeight: '400',
        color: "#000000",
        paddingTop: 20,
    },
    input: {
        backgroundColor: 'white',
        marginTop: 10,
        color:"#000000",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10   
    },
    textarea: {
        backgroundColor: 'white',
        marginTop: 10,
        textAlignVertical: 'top',
        color:"#000000",
        borderWidth: 1,
        borderRadius: 5,
    },
    dropdownBtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
        borderColor: "#000000",
    },
    dropdownBtnTxtStyle: {
        color: "#000000", 
        textAlign: 'left',
        fontSize: 14
    },
    dropdownDropdownStyle: {
        backgroundColor: 'white'
    },
    dropdownRowStyle: {
        backgroundColor: 'white', 
        borderBottomColor: '#C5C5C5'
    },
    dropdownRowTxtStyle: {
        color: '#000000', 
        textAlign: 'left'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonPrimary: {
        elevation: 8,
        backgroundColor: "#FFCC29",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 10,
        marginTop: 30,
        bottom: 0
       
    },
    buttonDisabled: {
        elevation: 8,
        backgroundColor: "#EEEDED",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 12,
        marginBottom: 10,
        marginTop: 30,
        bottom: 0,
    },
    buttonPrimaryText: {
        fontSize: 16,
        fontWeight: "500",
        color:  "#000000",
        textAlign: "center"
    },
    buttonDisabledText : {
        fontSize: 16,
        fontWeight: "500",
        color:  "#6B6A6ABF",
        textAlign: "center"
    },
    star: {
        color : "#F21616",
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 20,
    }
    
     
});