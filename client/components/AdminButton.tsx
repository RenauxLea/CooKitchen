import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: 'ingredientDatabase.db'});


export const AdminButton = () => {
    const navigation = useNavigation();

    // /!\ SI CONTRAINTE DE CLE ETRANGER desactiver les foreign_key /!\

    let update_bdd = () => {
        console.log('AIE !');
        
        db.transaction(function (tx) {
            tx.executeSql(
                // mettre la requete SQL pour la bdd
                'ALTER TABLE ingredients RENAME COLUMN test_rename TO test',
                [],
                (tx, results) => {
                    console.log("j'ai update");
            }
          );
        });
      };
      let delete_bdd= () => {
        console.log('Ça va être tout noir !!!');

        db.transaction(function (tx) {
            tx.executeSql(
                // Supprimer entièrement la table
                'DROP TABLE test',
                [],
                (tx, results) => {
                    console.log("C'est bon ! on la descendu ta table !");
            }
          );
        });
      }

      let this_bdd = () => {
        console.log('Je suis ta requette perso ^^');
        db.transaction(function (txn) {

            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='test'",
                [],
                function (tx, res) {
                    console.log(res);

                  if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS test', []);
                    txn.executeSql(
                      'CREATE TABLE IF NOT EXISTS test( expiration TEXT )',
                      []
                    );
                    console.log("tes desires ont été fait !");
                    
                  }
                }
              );
            }
        )
    }

    return(
        <View>
            <Pressable 
                    style= {styles.item}
                    onPress={() => update_bdd()}
                >
                    <View style={styles.information}>
                        <Text style={styles.title}>Update la bdd</Text>         
                    </View>

            </Pressable>

            <Pressable 
            style= {styles.item}
            onPress={() => delete_bdd()}
            >
            <View style={styles.information}>
                <Text style={styles.title}>Delete la bdd</Text>         
            </View>

            </Pressable>

            <Pressable 
            style= {styles.item}
            onPress={() => this_bdd()}
            >
            <View style={styles.information}>
                <Text style={styles.title}>Requete perso</Text>         
            </View>

            </Pressable>
        </View>
    )
}

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