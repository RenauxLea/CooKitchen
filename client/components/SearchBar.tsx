import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type SearchBarProps = {
    clicked: boolean,
    searchPhrase : string,
    setSearchPhrase:Dispatch<SetStateAction<string>>,
    setClicked: Dispatch<SetStateAction<boolean>>
}

const SearchBar = ({clicked , searchPhrase, setSearchPhrase, setClicked} : SearchBarProps ) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <Icon name="search"  size={20} color="#000000" />
        <TextInput
          style={styles.input}
          placeholder="Recherche un élément..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Icon name="close"  size={20} color="#000000"  onPress={() => {
              setSearchPhrase("")
          }}/>
        )}
       
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFCC29",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#FFCC29",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: "70%",
    height: 30,
    paddingBottom: 3,
   
  },
});