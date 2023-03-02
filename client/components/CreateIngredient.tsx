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
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'react-native-sqlite-storage';

import moment from "moment";
import { DropdownIngredientCategories } from "./DropdownIngredientCategories";
  
var db = openDatabase({ name: 'ingredientDatabase.db'});

export const CreateIngredient = () => { 
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [visibleDate, setVisibleDate] = React.useState(false); 
    const [open, setOpen] = React.useState(false);
    const [category , setCategory] = React.useState("");
    const [unit, setUnit] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<{name: string , id: string}>();

    const navigation = useNavigation();
   
    let expirationDate = ""
    if (date !== undefined) {
       expirationDate =  moment(date).format("DD-MM-YYYY")
    }
   
    const categories = [ 
        {name: "légume", id: "vegetable"} ,
        {name: "fruit", id:"fruit"},
        {name: "poisson", id:"fish"},
        {name: "viande", id: "meat"},
        {name: "céréales", id: "cereal"},
        {name: "produit laitier", id: "milkProduct"},
        {name: "aliment sucré", id: "sweetProduct"},
        {name: "autre", id: "other"},
    ]

    const units = [ "g", "cl", "aucune"];
    
    let register_ingredients = () => {
        console.log('\nName : ',name,' \nQuantity : ', quantity,' \nDate : ', expirationDate,' \nCategory : ', category,' \nUnit : ', unit);
        if (expirationDate == moment(Date()).format("DD-MM-YYYY")) {
            expirationDate = ''
        }
        //@ts-expect-error
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO ingredients (name, quantity, category, unit, expiration) VALUES (?,?,?,?,?)',
            [name, quantity, selectedCategory?.id, unit, expirationDate],
            (tx : any, results: any) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log('register OK');

              } else console.log('Registration Failed');
            }
          );
        });
      };
      console.log('data')
   return (
    <SafeAreaView>
        <ScrollView  
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        > 
            <View  >
                <Text style={styles.title}>Nouvel ingrédient</Text>
                <Text style={styles.subtitle}>Créé un ingrédient pour l'ajouter dans ton garde-manger</Text>
                <Text style={styles.text}>Nom:</Text>
                <TextInput
                    placeholder="navet"
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    defaultValue={name}
                />

                <Text style={styles.text}>Catégorie:</Text>
                <DropdownIngredientCategories
                    label="Sélectionne une catégorie"  
                    onSelect={setSelectedCategory} data={categories}
                />

                <Text style={styles.text}>Quantité:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={number => setQuantity(number)}
                    value={quantity}
                    placeholder='10'
                    maxLength={10}
                />
                <Text style={styles.text}>Unité:</Text>
                <SelectDropdown
                    data={units}
                    defaultButtonText={'Sélectionne une unité'}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                    renderDropdownIcon={ () => 
                        <Icon name="chevron-down"  size={25} color="#000000" />
                    }
                    dropdownIconPosition={'right'}
                    onSelect={(selectedItem) => {
                        setUnit(selectedItem)
                    }}
                    onChangeSearchInputText={() => {}}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item) => {
                        return item
                    }}
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
        {/* <Pressable onPress={() => navigation.navigate('Garde-manger' as never)} style={styles.buttonPrimary}> */}
        <Pressable onPress={() => 
            {
                register_ingredients(),
                navigation.navigate('Garde-manger' as never)
            }
            } style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Créer l'ingrédient</Text>
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
    }
     
});