import React, { FC, ReactElement, useRef, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string;
    data: Array<{ name: string; id: string }>;
    onSelect: (item: any) => void;
}

export const DropdownIngredientCategories: FC<Props> = ({ label , onSelect, data}) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<{id: string , name: string}>();

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown();
    };
  
    const openDropdown = (): void => {
        setVisible(true);
    };

    const onItemPress = (item : any): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item  }:any): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text style={{color: "#000000"}}>{item.name}</Text>
        </TouchableOpacity>
    );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          onPress={() => setVisible(false)}
        >
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
            {(selected && selected.name) || label}
        </Text>
        <Icon name="chevron-down"  size={20} color="#000000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    color: "#EEEDED"
  },
  buttonText: {
    flex: 1,
    color: "#000000"
  },
  dropdown: {
    marginVertical: 150,
    position: 'absolute',
    backgroundColor: '#fff',
    width: '90%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    elevation: 20
  },
});
