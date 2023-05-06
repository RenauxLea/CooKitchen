import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type RecipeFiltersProps = {
    visible : boolean,
    onClose: (selectedFilters : string[]) => void,
    onChange: (category : string, isSelected: boolean) => void,
    selectedFiltersInModal : string[],
}

export const RecipeFilters = ({visible, onClose, onChange, selectedFiltersInModal}: RecipeFiltersProps) => {
     // useState permettant de savoir quels filtres sont cochés ou non, ils sont non coché par défaut
    const [isSelectedDessert, setIsSelectedDessert] = React.useState(false);
    const [isSelectedMain, setIsSelectedMain] = React.useState(false);
    const [isSelectedOther, setIsSelectedOther] = React.useState(false);
    const [isSelectedEntree, setIsSelectedEntree] = React.useState(false);
    const [isSelectedFavorite, setIsSelectedFavorite] = React.useState(false);
   
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
                    <Text style={styles.titleStyle}>Catégories: </Text>
                    <View style={styles.filters}>
                      {/* lorsque l'on coche une checkbox, on change le state correspondant à ce filtre en particulier */}
                        <CheckBox
                            value={isSelectedEntree}
                            onValueChange={() =>{setIsSelectedEntree(!isSelectedEntree),
                            onChange("entree",isSelectedEntree)}}
                            style={styles.checkbox}
                            tintColors={{ true: 'FFCC29' }}
                            
                        />
                        <Text style={styles.label}>Entrées</Text>
                    </View>
                    <View style={styles.filters}>
                        <CheckBox
                            value={isSelectedMain}
                            onValueChange={() =>{setIsSelectedMain(!isSelectedMain),
                            onChange("main",isSelectedMain)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Plats de résistance</Text>
                    </View>


                    
                    <View style={styles.filters}>
                        <CheckBox
                            value={isSelectedDessert}
                            onValueChange={() =>{setIsSelectedDessert(!isSelectedDessert),
                            onChange("dessert",isSelectedDessert)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Desserts</Text>
                    </View>
                    <View style={styles.filters}>
                        <CheckBox
                            value={isSelectedOther}
                            onValueChange={() =>{setIsSelectedOther(!isSelectedOther),
                            onChange("other",isSelectedOther)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Autres</Text>
                    </View>

                    <View style={styles.filtersFavorite}>
                        <CheckBox
                            value={isSelectedFavorite}
                            onValueChange={() =>{setIsSelectedFavorite(!isSelectedFavorite),
                            onChange("favorite",isSelectedFavorite)}}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Recettes favorites</Text>

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
    filtersFavorite: {
        display: "flex",
        flexDirection: "row",
        marginTop: 30
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
    
  });