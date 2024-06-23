import React, { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Modal,
    FlatList,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Button } from "react-native";
import PickerItem from "./PickerItem";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";

type locationProp = {
    capital: string
}

type ItemProps = {
    locations: locationProp[],
    onSelectLocation: (item: locationProp) => string,
    selectedLocation: string,

}

const AppPicker = ({
    locations,
    onSelectLocation,
    selectedLocation,
    ...props
}: ItemProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    return (
        <>
            <TouchableOpacity
                style={[styles.input]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.labelText}>Location</Text>
                <View style={[styles.inputContainer]}>
                    <Text style={[styles.labelText, { color: activeColor.text }]}>
                        {selectedLocation ? selectedLocation.capital : "Select Location"}
                    </Text>
                    <TextInput style={[{ backgroundColor: activeColor.inputBackground }]} {...props} />
                    <AntDesign name="down" size={16} color={activeColor.icon} />
                </View>
            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide">
                <Button title="close" onPress={() => setModalVisible(false)} />
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.capital.toString()}
                    renderItem={({ item }) => (
                        <PickerItem
                            label={item.capital}
                            onPress={() => {
                                setModalVisible(false);
                                onSelectLocation(item);
                            }}
                        />
                    )}
                />
            </Modal>
        </>
    );
};

export default AppPicker;

const styles = StyleSheet.create({
    errorText: {
        color: Colors.error,
    },
    input: {
        marginBottom: 3,
    },
    labelText: {
        fontSize: 14,
        marginTop: 12,
        marginBottom: 7,
    },
    icon: {
        fontSize: 20,

        marginRight: 5,
    },
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        borderWidth: 0.5,
        borderRadius: 3,
        alignItems: "center",
        paddingHorizontal: 10,
        height: 40,
        // backgroundColor: 'red',
        justifyContent: 'space-between'

    },
    textInput: {

        flex: 1,
        fontSize: 15,
    },
});