
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import Pantry from '../assets/images/pantry.svg'

export type HomepageCardprops = {
    title: string,
    description : string,
    link: string,
}

var db = openDatabase({ name: 'ingredientDatabase.db'});

export const HomepageCard = (  {title, description, link} : HomepageCardprops )  => {

    
    useEffect( ()=>{
      // @ts-expect-error
        db.transaction(function (txn) {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='ingredients'",
              [],
<<<<<<< HEAD
              function (tx : any, res :any) {
=======
              function (tx, res) {
>>>>>>> 4f612e9 (fix)
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS ingredients', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS ingredients( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), quantity INT(10), category VARCHAR(100), unit VARCHAR(100), expiration DATE )',
                    []
                  );
                }
              }
            );
          }
        )
    })
    const navigation = useNavigation();

    return (
       
        <Pressable 
            style= {styles.item}
            onPress={() => navigation.navigate( link as never )}
        >
      
          {title === "Mes recettes" ?  
            <Image style={styles.image}  source={require("../assets/images/recipes.png")}/> :  
            <Pantry width={100} height={100} style={styles.image} />
          }
           
            <View style={styles.information}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>         
            </View>
          
        </Pressable>
    )
};

  const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFCC29',
        padding: 20,
        marginTop: 40,
        flexDirection: "row",
        borderRadius: 10   
    },
    title: {
        fontSize: 20,
        color: '#000000'
    },
    information: {
        width: "60%",
        flexDirection: "column",
        marginLeft: 10,
        justifyContent: "center"
    },
    image: {
        marginRight:10,
        borderRadius: 50,
        width: 100,
        height: 100
    },
    description: {
        fontSize: 12,
        color: '#000000'
    },
  
  });
  