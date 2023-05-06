import React from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View } from 'react-native';
import DatePicker from "react-native-date-picker";
import SelectDropdown from "react-native-select-dropdown";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'react-native-sqlite-storage';

import moment from "moment";
import { IngredientType } from "../types/ingredient";
import { DropdownUnit } from "./DropdownUnit";
import { DropdownRecipe } from "./DropdownRecipe";
import { categories, units } from "./CreateIngredient";
  
var db = openDatabase({ name: 'ingredientDatabase.db'});

export const EditIngredient = () => { 
    const route : RouteProp<{ params: { ingredient : IngredientType } }, 'params'> = useRoute();
    const {ingredient} = route.params;

    const id = ingredient.id; 
    const [name, setName] = React.useState(ingredient.name);
    const [quantity, setQuantity] = React.useState(ingredient.quantity);
    const [date, setDate] = React.useState(new Date());
    const [visibleDate, setVisibleDate] = React.useState(false); 
    const [open, setOpen] = React.useState(false);
    //const [category , setCategory] = React.useState(ingredient.category);
    const [unit, setUnit] = React.useState(ingredient.unit);
    const [selectedCategory, setSelectedCategory] = React.useState<{name: string , id: string} |undefined> (categories.find(c=>c.id === ingredient.category));


    const navigation = useNavigation();

    let expirationDate = ""
    if (date !== undefined) {
       expirationDate =  moment(date).format("DD-MM-YYYY")
    }   
  
    const update_ingredients = async () => {
        console.log('\nName : ',name,' \nQuantity : ', quantity,' \nDate : ', expirationDate,' \nCategory : ', selectedCategory,' \nUnit : ', unit);
        if (expirationDate == moment(Date()).format("DD-MM-YYYY")) {
            expirationDate = ''
        }
       
        (await db).transaction(function (tx) {
          console.log('MISE A JOUR WINDOW : ');
            
          tx.executeSql(
            'UPDATE ingredients SET name = ?, quantity = ?, category = ?, unit = ?, expiration = ? WHERE id='+id,
            [name, quantity, selectedCategory?.id, unit, expirationDate],
            (tx , results) => {
              if (results.rowsAffected > 0) {
                console.log('Votre appareil apple à bien été mise à jour');

              } else console.log('BLUE SCREEN');
            }
          );
        });
      };
    
    console.log('je suis category : ',selectedCategory);
    console.log('je suis unit : ', setUnit);
    
    
   return (
    <SafeAreaView>
        <ScrollView  
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        > 
            <View  style={styles.containerForm}>
                <Text style={styles.title}>Modification ingrédient</Text>
                <Text style={styles.text}>Nom:</Text>
                <TextInput
                    placeholder="navet"
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    defaultValue={name}
                />

                <Text style={styles.text}>Catégorie:</Text>
                <DropdownRecipe
                    label="Sélectionne une catégorie"  
                    onSelect={setSelectedCategory} data={categories}
                    current={selectedCategory} 
                />

                <Text style={styles.text}>Quantité:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={number => setQuantity(number)}
                    value={String(quantity)}
                    placeholder='10'
                    maxLength={10}
                />
                <Text style={styles.text}>Unité:</Text>
                <DropdownUnit
                    label="Sélectionne une unité"  
                    onSelect={setUnit} data={units}
                    current={unit}
                />
                
                <Text style={styles.text}>Date de péremption:</Text>
                <Text style={styles.textDate} >
                    {visibleDate ? expirationDate : "Aucune date sélectionnée"} 
                </Text> 
                <Pressable
                    style={styles.button}
                    onPress={() => setOpen(true)}
                >
                    <Text style={styles.buttonText}> Choisir une date </Text>
                </Pressable>
                <DatePicker
                    modal
                    mode={"date"}
                    locale={"fr"}
                    title={"Sélectionne une date"}
                    confirmText={"valider"}
                    cancelText={"annuler"}
                    minimumDate={new Date("2023-05-19")}
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setVisibleDate(true)
                    }}
                    onCancel={() => {
                    setOpen(false)
                    }}
                />

                
            </View>
        </ScrollView>
        <View style={{position:'absolute',bottom:0, left: 10, right: 10}}>
        <Pressable onPress={async() => 
            {
                await update_ingredients(),
                navigation.navigate('Ingredient' as never, {ingredient} as never)} 
            
            } style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Modifier l'ingrédient</Text>
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
    containerForm: {
        paddingBottom: 100
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
        borderRadius: 5
    },
    dropdownBtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#000000",
        marginTop: 10,
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
    buttonText : {
        fontSize: 16,
        color: "#000000"
    },
    textDate: {
        paddingVertical: 10
    },
    buttonPrimary: {
        elevation: 8,
        backgroundColor: "#FFCC29",
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
    }
     
});