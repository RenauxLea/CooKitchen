import React from "react";
import {
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
 } from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { IngredientsByCategory } from "./utils/IngredientsByCategory";
import { ingredientFixtures } from "./Pantry";
import { IngredientLinkedType,  } from "../types/ingredient";

 
const ingredientsByCategories = IngredientsByCategory(ingredientFixtures)
  
export const CreateRecipe = () => { 
    const [name, setName] = React.useState('');
    const [category , setCategory] = React.useState("");
    const [preparationTime  , setPreparationTime ] = React.useState("");
    const [cookingTime   , setCookingTime  ] = React.useState("");
    const [quantity, setQuantity] = React.useState('');
    const [linkedIngredientIds, setLinkedIngredientIds] = React.useState<string[]>([]);
    const [linkedIngredients, setLinkedIngredients] = React.useState<IngredientLinkedType[]>([]);
    const [description, setDesciption]= React.useState("");
    
    const navigation = useNavigation();
   
    const categories = [ 
        {name : "entrée", id: "starter"} ,
        {name: "plat de résistance", id:"dish"},
        {name: "dessert", id:"dessert"},
    ]

    const preparationTimeData = [
        {name : "15min", id: "15"},
        {name : "30min", id: "30"},
        {name : "45min", id: "45"},
        {name : "1h", id: "60"},
        {name : "1h30", id: "90"},
        {name : "plus de 1h30", id: "more"},
    ]

    const renderItem =  ({item } : any) =><Text key={item.key} > {item.name} {item.quantity} {item.unit} </Text>;

    const keyExtractor = (item :any) => item.id;


    const onSelectedIngredientsChange = (selectedItems : string[]) => {
        setLinkedIngredientIds(selectedItems)
      };

    const getLinkedIngredientsInformation = () => {
        let ingredients : IngredientLinkedType[] = [];
        ingredientFixtures.forEach((element) => {
            const isSelected = linkedIngredientIds.find( id => id === element.id)
                if(isSelected) {
                    ingredients.push( {
                            id : element.id,
                            name : element.name,
                            quantityForRecipe : element.quantity,
                            category : element.category,
                            unit : element.unit
                        }
                    );
               }
            }   
        )
        setLinkedIngredients(ingredients);
    }

    React.useEffect(() => {
        getLinkedIngredientsInformation()
    }, [linkedIngredientIds])

   return (
    <SafeAreaView>  
        <ScrollView  
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        > 
            <View  >
                <Text style={styles.title}>Nouvelle recette</Text>
                <Text style={styles.subtitle}>Créé une nouvelle recette pour l’ajouter à la liste de tes recettes</Text>
                <Text style={styles.text}>Nom:</Text>
                <TextInput
                    placeholder="gratin dauphinois"
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
                          <Icon name="keyboard-arrow-down"  size={25} color="#000000" />
                    }
                    dropdownIconPosition={'right'}
                    defaultButtonText={'Sélectionne une catégorie'}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                /> 
   
                <Text style={styles.text}>Temps de préparation:</Text>
                <SelectDropdown
                    data={preparationTimeData}
                    onSelect={(selectedItem) => {
                        setPreparationTime(selectedItem.id)
                    }}
                    onChangeSearchInputText={() => {}}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name
                    }}
                    rowTextForSelection={(item) => {
                        return item.name
                    }}
                    renderDropdownIcon={ () => 
                          <Icon name="keyboard-arrow-down"  size={25} color="#000000" />
                    }
                    dropdownIconPosition={'right'}
                    defaultButtonText={'Temps de préparation'}
                    buttonStyle={styles.dropdownBtnStyle}
                    buttonTextStyle={styles.dropdownBtnTxtStyle}
                    dropdownStyle={styles.dropdownDropdownStyle}
                    rowStyle={styles.dropdownRowStyle}
                    rowTextStyle={styles.dropdownRowTxtStyle}
                /> 

                <Text style={styles.text}>Temps de cuisson(en minutes):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={number  => setCookingTime(number)}
                    value={cookingTime}
                    placeholder='10'
                    maxLength={10}
                />

                <Text style={styles.text}>Nombre de personne(s):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={number  => setQuantity(number)}
                    value={quantity}
                    placeholder='2'
                    maxLength={10}
                />

                <Text style={styles.text}>Ingrédients:</Text>
                <SectionedMultiSelect
                    items={ingredientsByCategories}
                    // @ts-expect-error
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Ingrédients"
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={onSelectedIngredientsChange}
                    selectedItems={linkedIngredientIds}
                    styles={{
                        selectToggle: {
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingVertical: 10,
                            marginTop: 10,
                            paddingHorizontal: 10    
                        },
                        confirmText: {
                            color: '#000000'
                        }

                    }}
                    colors={{ primary: '#FFCC29'  }}
                    noItemsComponent={<Text>Pas d'ingrédient disponible, veuillez en créer dans le garde-manger</Text>}
                    noResultsComponent={<Text>Aucun résultat</Text>}
                    searchPlaceholderText={"tomate, poivron..."}
                    confirmText={"Valider"}
                    showChips={false}
                    selectedText={"sélectionnés"}
                    
                />
    
                {linkedIngredientIds.length > 0 &&
                    <FlatList
                        data={linkedIngredients}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        horizontal={true}
                    />
                }

                <Text style={styles.text}>Description:</Text>
                <TextInput
                    style={styles.textarea}
                    placeholder='couper les pommes de terres ...'
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(text) => setDesciption(text)}
                    value={description}
                />
                
        </View>
        </ScrollView>
        <Pressable onPress={() => navigation.navigate('Mes Recettes' as never)} style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Créer la recette</Text>
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
        borderRadius: 5,
        paddingHorizontal: 10   
    },
    textarea: {
        backgroundColor: 'white',
        marginTop: 10,
        textAlignVertical: 'top',
        color:"#000000",
        borderWidth: 1,
        borderRadius: 5,
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
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonText : {
        fontSize: 16,
        color: "#000000"
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
        fontSize: 20,
        fontWeight: "500",
        color:  "#000000",
    }
     
});