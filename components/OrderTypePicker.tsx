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
    placeholder: string
    orderType: OptionItem[] | unknown;
    onSelect: (item: OptionItem) => void;
    borderRadius?: number

}

const OrderTypePicker = ({ orderType, onSelect, placeholder, ...props }: CustomPickerTextInputProps) => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<OptionItem | null>(null);
    const [modalHeight, setModalHeight] = useState<number>(0);
    const [isFocused, setIsFocused] = useState<boolean>(false);


    const handleSelect = (item: OptionItem) => {
        setSelectedItem(item);
        onSelect(item);
        setModalVisible(false);
    };

    useEffect(() => {
        const itemHeight = 50;
        const maxItems = 5;
        const calculatedHeight = Math.min(orderType?.length, maxItems) * itemHeight + 100;
        setModalHeight(calculatedHeight);
    }, [orderType]);

    return (
        <View>

            <TouchableOpacity
                style={[styles.inputContainer]}
                onPress={() => setModalVisible(true)}
            >

                <TextInput
                    style={[
                        styles.textInput,
                        {
                            borderBottomWidth: isFocused ? 1.5 : StyleSheet.hairlineWidth,
                            color: activeColor.text,
                            borderBottomColor: isFocused ? Colors.btnPrimaryColor : activeColor.icon
                        },
                    ]}
                    placeholder={placeholder || 'Order Type'}
                    placeholderTextColor={"#aaa"}
                    cursorColor={activeColor.text}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    {...props}
                    value={selectedItem ? selectedItem.name : ''}
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
                            data={orderType}
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
    textInput: TextStyle;
    modalOverlay: ViewStyle;
    modalContent: ViewStyle;
    optionItem: ViewStyle;

}

const styles = StyleSheet.create<Styles>({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    textInput: {
        fontSize: 14,
        width: '75%',
        alignSelf: "center",
        fontFamily: "Poppins-Regular",
        paddingHorizontal: 5
    },

    text: {
        fontSize: 14,
        fontFamily: "Poppins-Medium",
        marginTop: 10,

    },

});

export default OrderTypePicker;