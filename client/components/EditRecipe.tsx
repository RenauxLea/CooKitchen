import React, { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
 } from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { IngredientsByCategory } from "./utils/IngredientsByCategory";
import { IngredientLinkedType,  } from "../types/ingredient";
import { LinkedIngredientCard } from "./LinkedIngredientCard";
import { openDatabase } from "react-native-sqlite-storage";
import { DropdownRecipe } from "./DropdownRecipe";
import { RecipeType } from "../types/recipe";
import { categories } from "./CreateRecipe";

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

export const EditRecipe = () => {
    const route : RouteProp<{ params: { recipe : RecipeType } }, 'params'> = useRoute();
    const {recipe} = route.params;

    const id = recipe.id; 
    const [name, setName] = React.useState(recipe.name);
    const [category , setCategory] = React.useState(recipe.category);
    const [preparationTime  , setPreparationTime ] = React.useState(recipe.preparationTime);
    const [cookingTime   , setCookingTime  ] = React.useState(recipe.cookingTime);
    const [quantity, setQuantity] = React.useState(recipe.quantity);
    //const [linkedIngredientIds, setLinkedIngredientIds] = React.useState<{id : string; quantityRecipe : string}[]>([]);
    const [linkedIngredients, setLinkedIngredients] = React.useState<IngredientLinkedType[]>(recipe.listIngredients);
    const [description, setDesciption]= React.useState(recipe.description);

    let [listIngredientBdd, setListIngredientBdd] = useState([])
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
          // @ts-expect-error
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

    // Modifi?? la qte d'un ingredient dans le tableau d'ingredient
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

    const renderItem =  ({item } : any) =>{

        return <LinkedIngredientCard 
            id={item.id} 
            name={item.name} 
            quantityForRecipe={item.quantityForRecipe}
            unit={item.unit}
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
                    
                    const test = selectedItems.find( id => id === isSelected)
                    
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

    const get_data = () => {
        
        let objDescription = JSON.stringify(linkedIngredients)
 
        
        //@ts-expect-error
        db.transaction(function (tx) {
            tx.executeSql(
              'UPDATE recipes SET name = ?, quantity = ?, category = ?, preparationTime = ?, cookingTime = ?, linkedIngredients = ?, description = ? WHERE id='+id,
              [name, quantity, category, preparationTime, cookingTime, objDescription, description],
              (tx:any, results:any) => {
                if (results.rowsAffected > 0) {
                  console.log('Recette Update');
  
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
            <View  >
                <Text style={styles.title}>Modification recette</Text>
                <Text style={styles.subtitle}>Modifier la recette</Text>
                <Text style={styles.text}>Nom:</Text>
                <TextInput
                    placeholder="gratin dauphinois"
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    defaultValue={name}
                />

                <Text style={styles.text}>Cat??gorie:</Text>

                <DropdownRecipe 
                    label={"S??lectionne une cat??gorie"} 
                    data={categories} 
                    onSelect={setCategory}
                />
   
                <Text style={styles.text}>Temps de pr??paration:</Text>
                <DropdownRecipe 
                    label={"Temps de pr??paration"} 
                    data={preparationTimeData} 
                    onSelect={setPreparationTime}
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

                <Text style={styles.text}>Ingr??dients:</Text>
                <SectionedMultiSelect
                    items={ingredientsByCategories}
                    // @ts-expect-error
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Ingr??dients"
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
                    noItemsComponent={<Text>Pas d'ingr??dient disponible, veuillez en cr??er dans le garde-manger</Text>}
                    noResultsComponent={<Text>Aucun r??sultat</Text>}
                    searchPlaceholderText={"tomate, poivron..."}
                    confirmText={"Valider"}
                    showChips={false}
                    selectedText={"s??lectionn??s"}
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
        <Pressable onPress={() => 
            {
                get_data(),
                navigation.navigate('Mes Recettes' as never)
            }
            } style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Modifier la recette</Text>
        </Pressable>  
    </SafeAreaView> 
   );
}

const styles = StyleSheet.create({    
    container: {
        color: "#FFFFFF",
        paddingHorizontal: 24,
        marginBottom: 20,
        height: "85%",  
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
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 10,
        display: "flex",
        alignItems: "center",
    },
    buttonPrimaryText: {
        fontSize: 16,
        fontWeight: "500",
        color:  "#000000",
    },
    
     
});