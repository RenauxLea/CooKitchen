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
import { useNavigation } from "@react-navigation/native";
import { Transaction, openDatabase } from 'react-native-sqlite-storage';

import moment from "moment";
import { DropdownUnit } from "./DropdownUnit";
import { DropdownRecipe } from "./DropdownRecipe";
import { Unit } from "../types/ingredient";
import { Units } from "react-native-svg";
import { register_ingredients } from "../../server/ingredient/createUpdate";
 
var db = openDatabase({ name: 'ingredientDatabase.db'});

// liste des catégories d'ingrédients
export const categories = [ 
    {name: "légume", id: "vegetable"} ,
    {name: "fruit", id:"fruit"},
    {name: "poisson", id:"fish"},
    {name: "viande", id: "meat"},
    {name: "céréales", id: "cereal"},
    {name: "produit laitier", id: "milkProduct"},
    {name: "aliment sucré", id: "sweetProduct"},
    {name: "autre", id: "other"},
]

export const units:Unit[] = [ "g", "cl", "aucune"];

export const CreateIngredient = () => { 
    // les useState permettant de stocker temporairement les informations du nouvel ingrédient
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [visibleDate, setVisibleDate] = React.useState(false); 
    const [open, setOpen] = React.useState(false);
    const [category , setCategory] = React.useState("");
    const [unit, setUnit] = React.useState<Unit>();
    const [selectedCategory, setSelectedCategory] = React.useState<{name: string , id: string}>();

    const navigation = useNavigation();
   
    let expirationDate = ""
    if (date !== undefined) {
       expirationDate =  moment(date).format("DD-MM-YYYY")
    }
  
    return (
    <SafeAreaView>
        <ScrollView  
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        > 
            <View style={styles.containerForm}  >
                <Text style={styles.title}>Nouvel ingrédient</Text>
                <Text style={styles.subtitle}>Créé un ingrédient pour l'ajouter dans ton garde-manger</Text>
                <Text style={styles.star}>*<Text style={styles.text}>Nom:</Text></Text>
               
                <TextInput
                    placeholder="navet"
                    style={styles.input}
                    onChangeText={text => setName(text)}
                    defaultValue={name}
                />

                <Text style={styles.star}>*<Text style={styles.text}>Catégorie:</Text></Text>
                <DropdownRecipe
                    label="Sélectionne une catégorie"  
                    onSelect= {setSelectedCategory} data={categories}
                    current = {selectedCategory}
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
                <DropdownUnit
                    label="Sélectionne une unité"  
                    onSelect={setUnit} data={units}
                    current = {unit}
                />
              

                <Text style={styles.text}>Date de péremption:</Text>
                <Text style={styles.textDate} >
                    {visibleDate ? expirationDate : "Aucune date sélectionnée"} 
                </Text> 
                {/* pressable permettant d'ouvrir le date picker de date de péremption */}
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
                    // minimum date pour ne pas avoir de date de péremption incohérente
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
            <Pressable onPress={() => 
                    {
                        register_ingredients(name,quantity,selectedCategory!.id,unit ? unit : "aucune",expirationDate,'create'),
                        navigation.navigate('Garde-manger' as never, {refetch : true} as never)
                    }
                    } 
                    // le nom est obligatoire, on ne peut donc pas cliquer sur le bouton lorsqu'il n'y a pas de nom et le bouton est grisé
                    style={name === "" || name === undefined ? styles.buttonDisabled : styles.buttonPrimary} 
                    disabled={name === "" || name === undefined}
                >

                <Text style={name === "" || name === undefined ? styles.buttonDisabledText : styles.buttonPrimaryText}>Créer l'ingrédient</Text>
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
        borderRadius: 5
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
        textAlign:"center"
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