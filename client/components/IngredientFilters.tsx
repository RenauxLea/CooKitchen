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
    const [isSelectedVegetable, setIsSelectedVegetable] = React.useState(false);

    return (
        <View >
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}>
          <View style={styles.overlayView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Filtres</Text>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelectedVegetable}
                        onValueChange={() =>{setIsSelectedVegetable(!isSelectedVegetable),
                        onChange("vegetable",isSelectedVegetable)}}
                        style={styles.checkbox}
                    />
                    <Text style={styles.label}>Légumes</Text>
                </View>


              <Pressable
                style={[styles.button, styles.buttonClose]}
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
      margin: 20,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: "100%",
      height: "100%"
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: 'center',
      },
      label: {
        margin: 8,
      },
  });