
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";


export type HomepageCardprops = {
    title: string,
    description : string,
    illustration : ImageSourcePropType,
    link: string,
}

var db = openDatabase({ name: 'ingredientDatabase.db'});

export const HomepageCard = (  {title, description, illustration, link} : HomepageCardprops )  => {

    
    useEffect(()=>{
        db.transaction(function (txn) {
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='ingredients'",
              [],
              function (tx, res) {
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
      
            <Image style={styles.image} source={illustration}></Image>
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
        width: 100,
        height: 100,
        marginRight:10,
        borderRadius: 50
    },
    description: {
        fontSize: 12,
        color: '#000000'
    },
  
  });
  