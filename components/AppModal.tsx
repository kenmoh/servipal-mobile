import { Colors } from '@/constants/Colors';
import { SIZES } from '@/constants/Sizes';
import { ThemeContext } from '@/context/themeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';


interface OptionItem {
    name: string;
    id: number;
}

interface CustomPickerTextInputProps {
    label: string
    categories: OptionItem[] | unknown;
    onSelect: (item: OptionItem) => void;
    borderRadius?: number

}

const CustomPickerTextInput = ({ categories, onSelect, label, borderRadius = 50 }: CustomPickerTextInputProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<OptionItem | null>(null);
    const [modalHeight, setModalHeight] = useState<number>(0);


    const handleSelect = (item: OptionItem) => {
        setSelectedItem(item);
        onSelect(item);
        setModalVisible(false);
    };

    useEffect(() => {
        const itemHeight = 50;
        const maxItems = 5;
        const calculatedHeight = Math.min(categories?.length, maxItems) * itemHeight + 100;
        setModalHeight(calculatedHeight);
    }, [categories]);

    return (
        <View>
            <Text style={[styles.text, { color: activeColor.text }]}>{label}</Text>
            <TouchableOpacity
                style={[styles.inputContainer, { backgroundColor: activeColor.inputBackground, borderRadius }]}
                onPress={() => setModalVisible(true)}
            >
                <TextInput
                    style={[styles.input, { color: activeColor.text, fontFamily: 'Poppins-Light' }]}
                    value={selectedItem ? selectedItem.name : ''}
                    editable={false}
                />
                <MaterialCommunityIcons name="chevron-down" size={20} color={activeColor.icon} />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={[styles.modalContent, { height: modalHeight, backgroundColor: activeColor.profileCard }]}>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.optionItem, { borderBottomColor: activeColor.icon }]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={{ color: activeColor.text, fontFamily: 'Poppins-Light' }}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

interface Styles {
    text: TextStyle
    inputContainer: ViewStyle;
    input: ViewStyle;
    modalOverlay: ViewStyle;
    modalContent: ViewStyle;
    optionItem: ViewStyle;

}

const styles = StyleSheet.create<Styles>({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.paddingLarge,
    },
    input: {
        flex: 1,
        height: 50,

    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        borderRadius: SIZES.paddingSmall,
        padding: SIZES.paddingLarge,
        width: '90%',
        maxHeight: '80%',
    },
    optionItem: {
        padding: SIZES.paddingMedium,
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
    text: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        marginTop: 10
    },


});

export default CustomPickerTextInput;