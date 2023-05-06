import React, { FC, ReactElement, useRef, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Units } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { Unit } from '../types/ingredient';

interface Props {
    label: string;
    data: Array<Unit>;
    onSelect: (item: Unit) => void;
    current? : Unit
}

export const DropdownUnit: FC<Props> = ({ label , onSelect, data, current}) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<Unit>();

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };
  
    const openDropdown = (): void => {
        setVisible(true);
    };

    const onItemPress = (item : Unit): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    if (current && selected===undefined) {
      setSelected(current)
    }

    const renderItem = ({ item  }:any): ReactElement<any, any> => (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text style={{color: "#000000"}}>{item}</Text>
        </TouchableOpacity>
    );
  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent={false} animationType="none">
        <TouchableOpacity
          onPress={() => setVisible(false)}
        >
          <Text style={styles.dropdownTitle}>Sélectionne une unité</Text>
          <View style={styles.dropdown}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
    >
        {renderDropdown()}
        <Text style={styles.buttonText}>
            {(selected && selected) || label}
        </Text>
        <Icon name="chevron-down"  size={20} color="#000000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dropdownTitle: {
    marginVertical:100,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#000000"
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    color: "#EEEDED",
    borderColor: "#EEEDED",
  },
  buttonText: {
    flex: 1,
    color: "#000000"
  },
  dropdown: {
    marginVertical:200,
    position: 'absolute',
    backgroundColor: '#fff',
    borderColor: "#EEEDED",
    width: '90%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    elevation: 20
  },
});
