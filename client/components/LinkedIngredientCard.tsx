import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { IngredientLinkedType } from "../types/ingredient";
import { firstLetterInUppercase } from "./utils/FirstLetterInUppercase";

export const LinkedIngredientCard = (  ingredient : IngredientLinkedType )  => {
    const [quantity, setQuantity] = React.useState("")

    return (
        <View style={styles.item}>
            <View style={styles.information}>
                <Text style={styles.name}>{firstLetterInUppercase(ingredient.name)}:</Text>
                <View style={styles.quantityContainer} >
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        onChangeText={number  => setQuantity(number)}
                        value={quantity}
                        placeholder='10'
                        maxLength={10}
                    />
                    <Text style={styles.quantity}>  { (ingredient.unit !== undefined && ingredient.unit !== "aucune") && ingredient.unit  }</Text>       
                </View>
            </View>
        </View>
          
    )
};

const styles = StyleSheet.create({
    item: {
        width: "100%",
        display: "flex",
        height: 80,
    },
    name: {
        fontSize: 16,
        color: '#000000',
        fontWeight: "500"
    },
    information: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        justifyContent:"space-between"
    },
    input: {
        backgroundColor: 'white',
        width: 100,
        height: 40,
        marginHorizontal: 10,
        color:"#000000",
        borderWidth: 1,
        borderRadius: 5,   
    },
    quantity: {
        fontSize: 16,
        color: '#000000',
    },
    quantityContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }  
});
