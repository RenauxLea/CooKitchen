import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type IngredientFiltersProps = {
    visible : boolean,
    onClose: (selectedFilters : string[]) => void,
    onChange: (category : string, isSelected: boolean) => void,
    selectedFiltersInModal : string[],
}

export const IngredientFilters = ({visible, onClose, onChange, selectedFiltersInModal}: IngredientFiltersProps) => {
    // useState permettant de savoir quels filtres sont cochés ou non, ils sont non coché par défaut
    const [isSelectedVegetable, setIsSelectedVegetable] = React.useState(false);
    const [isSelectedFruit, setIsSelectedFruit] = React.useState(false);
    const [isSelectedOther, setIsSelectedOther] = React.useState(false);
    const [isSelectedFish, setIsSelectedFish] = React.useState(false);
    const [isSelectedMeat, setIsSelectedMeat] = React.useState(false);
    const [isSelectedOutOfStock, setIsSelectedIsOutOfStock] = React.useState(false);
    const [isSelectedInStock, setIsSelectedIsInStock] = React.useState(false);
    const [isSelectedCereal, setIsSelectedCereal] = React.useState(false);
    const [isSelectedMilkProduct, setIsSelectedMilkProduct] = React.useState(false);
    const [isSelectedSweetProduct, setIsSelectedSweetProduct] = React.useState(false);

  return (
        <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}>
          <View style={styles.overlayView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Filtres</Text>
                <View >   
                    <Text style={styles.titleStyle}>Stocks des ingrédients: </Text>
                    <View style={styles.filters}>
                        {/* lorsque l'on coche une checkbox, on change le state correspondant à ce filtre en particulier */}
                        <CheckBox
                            value={isSelectedInStock}
                            onValueChange={() =>{setIsSelectedIsInStock(!isSelectedInStock),
                            onChange("inStock",isSelectedInStock)}}
                            style={styles.checkbox}
                            tintColors={{ true: 'FFCC29' }}
                            
                        />
                        <Text style={styles.label}>En stock</Text>
                        <CheckBox
                            value={isSelectedOutOfStock}
                            onValueChange={() =>{setIsSelectedIsOutOfStock(!isSelectedOutOfStock),
                            onChange("outOfStock",isSelectedOutOfStock)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>En rupture</Text>
                    </View>


                    <Text style={styles.titleStyle}>Catégories: </Text>
                    <View style={styles.filters}>
                        <CheckBox
                            value={isSelectedVegetable}
                            onValueChange={() =>{setIsSelectedVegetable(!isSelectedVegetable),
                            onChange("vegetable",isSelectedVegetable)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.labelVegetable}>Légumes</Text>

                        <CheckBox
                            value={isSelectedFruit}
                            onValueChange={() =>{setIsSelectedFruit(!isSelectedFruit),
                            onChange("fruit",isSelectedFruit)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Fruits</Text>
                    </View>

                    <View style={styles.filters}>
                        <CheckBox
                            value={isSelectedMeat}
                            onValueChange={() =>{setIsSelectedMeat(!isSelectedMeat),
                            onChange("other",isSelectedMeat)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.labelMeat}>Viandes</Text>

                        <CheckBox
                            value={isSelectedFish}
                            onValueChange={() =>{setIsSelectedFish(!isSelectedFish),
                            onChange("fish",isSelectedFish)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Poissons</Text>

                    </View>

                    <View style={styles.filters}>
                        <CheckBox
                            value={isSelectedMilkProduct}
                            onValueChange={() =>{setIsSelectedMilkProduct(!isSelectedMilkProduct),
                            onChange("milkProduct",isSelectedMilkProduct)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Produits laitiers</Text>
                        <CheckBox
                            value={isSelectedCereal}
                            onValueChange={() =>{setIsSelectedCereal(!isSelectedCereal),
                            onChange("cereal",isSelectedCereal)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Céréales</Text>

                    </View>

                    <View style={styles.filters}>
                        <CheckBox
                            value={isSelectedSweetProduct}
                            onValueChange={() =>{setIsSelectedSweetProduct(!isSelectedSweetProduct),
                            onChange("sweetProduct",isSelectedSweetProduct)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.labelSweetProduct}>Produits sucrées</Text>
                        <CheckBox
                            value={isSelectedOther}
                            onValueChange={() =>{setIsSelectedOther(!isSelectedOther),
                            onChange("other",isSelectedOther)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Autres</Text>

                    </View>
                    
                </View>


              <Pressable
                style={styles.buttonClose}
                // lorsque l'on appuie sur Valider, on passe les filtres au composant parent qui est la liste des ingrédients pour pouvoir filtrer
                onPress={() => onClose(selectedFiltersInModal)}>
                <Text style={styles.textStyle}>Valider</Text>
            </Pressable>
            </View>
          </View>
        </Modal>
        
      </View>
    );
  };
  
const styles = StyleSheet.create({
    overlayView: {
        flex: 1,
        position:'absolute',
        bottom:0, 
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center"
    },
    modalView: {
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      shadowColor: '#000000',
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 8,
      width: "100%",
      height: "100%"
    },
    filters: {
        display: "flex",
        flexDirection: "row"
    },
    buttonClose: {
        marginTop: 50,
        borderRadius: 10,
        padding: 10,
        elevation: 8,
        backgroundColor: "#FFCC29",
    },
    textStyle: {
        fontSize: 16,
        color: "#000000",
        fontWeight: "500",
        alignSelf: "center",
    },
    modalTitle: { 
        fontSize: 24,
        fontWeight: '800',
        color: '#FFCC29',
        textAlign: "center"     
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '400',
        color: "#000000",
        paddingBottom: 10,
        paddingTop: 20 ,
    },
    checkboxContainer: {
        flexDirection: 'column', 
      },
    checkbox: {   
    },
    label: {
        marginVertical: 4,
        marginRight: 30,
        fontSize: 16,
        color: "#000000",
    },
    labelSweetProduct: {
        marginVertical: 4,
        marginRight: 22,
        fontSize: 16,
        color: "#000000",
    },
    labelMeat: {
        marginVertical: 4,
        marginRight: 84,
        fontSize: 16,
        color: "#000000",
    },
    labelVegetable: {
        marginVertical: 4,
        marginRight: 77,
        fontSize: 16,
        color: "#000000",
    }
  });