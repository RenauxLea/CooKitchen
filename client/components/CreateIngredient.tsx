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

  
export const CreateIngredient = () => { 
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [visibleDate, setVisibleDate] = React.useState(false); 

    let expirationDate =""
    if (date !== undefined) {
        expirationDate =date.getDate() +'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    }
   
    
    const [open, setOpen] = React.useState(false);

    
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
               
                

                <Text style={styles.title}>Quantité:</Text>
                <TextInput
                    keyboardType='numeric'
                    onChangeText={number => setQuantity(number)}
                    value={quantity}
                    placeholder='10'
                    maxLength={10}
                />
                <Text style={styles.title}>Unité:</Text>
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