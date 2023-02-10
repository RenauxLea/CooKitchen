import React from "react";
import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    
  } from 'react-native';
import DatePicker from "react-native-date-picker";
import SelectDropdown from "react-native-select-dropdown";

  
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
        > 
            <View >
                <Text style={styles.title}>Nom:</Text>
                <TextInput
                    placeholder="navet"
                    onChangeText={text => setName(text)}
                    defaultValue={name}
                />

                <Text style={styles.title}>Catégorie:</Text>
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
                /> 

                <Text style={styles.title}>Quantité:</Text>
                <TextInput
                    keyboardType='numeric'
                    onChangeText={number => setQuantity(number)}
                    value={quantity}
                    placeholder='10'
                    maxLength={10}
                />
                <Text style={styles.title}>Unité:</Text>
                <SelectDropdown
                    data={units}

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



                <Text style={styles.title}>Date de péremption:</Text>
                <Text >
                    {visibleDate && expirationDate } 
                </Text> 

                <Button title="Open" onPress={() => setOpen(true)} />
                <DatePicker
                    modal
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
    title: {
        fontSize: 12,
        fontWeight: '700',
        paddingTop: 20,
        color: "#000000",
    },
});