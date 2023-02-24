import React from "react";
import {
    Button,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    
  } from 'react-native';
import DatePicker from "react-native-date-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";

import Icon from 'react-native-vector-icons/Ionicons';
  
export const CreateIngredient = () => { 
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [visibleDate, setVisibleDate] = React.useState(false); 
    const [open, setOpen] = React.useState(false);
    const [category , setCategory] = React.useState("");
    const [unit, setUnit] = React.useState("");
   
    let expirationDate =""
    if (date !== undefined) {
        expirationDate =date.getDate() +'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    }
   
    const categories = [ 
        {name : "légume", id: "vegetable"} ,
        {name: "fruit", id:"fruit"},
        {name: "poisson", id:"fish"},
        {name: "viande", id: "meat"},
        {name: "céréales", id: "cereal"},
        {name: "produit laitier", id: "milkProduct"},
        {name: "aliment sucré", id: "sweetProduct"},
        {name: "autre", id: "other"},
    ]

    const units = [ "g", "cl", "aucune"];
       
   return (
    <SafeAreaView>
        <ScrollView  
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        > 
            <View >
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
                <SelectDropdown
                    data={categories}

                    onSelect={(selectedItem) => {
                        setCategory(selectedItem.id)
                    }}
                    onChangeSearchInputText={() => {}}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name
                    }}
                    rowTextForSelection={(item) => {
                        return item.name
                    }}
                    renderDropdownIcon={ () => 
                          <Icon name="chevron-down"  size={25} color="#000000" />
                    }
                    dropdownIconPosition={'right'}

                    defaultButtonText={'Sélectionne une catégorie'}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
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
                <Text style={styles.text} >
                    {visibleDate && expirationDate } 
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
    
    text: {
        fontSize: 20,
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
        textAlign: 'left'
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
        paddingVertical: 20,
        paddingHorizontal: 32,
        borderRadius: 10,
        borderWidth: 2,
    },

    buttonText : {
        fontSize: 20,
    }
    
     
});