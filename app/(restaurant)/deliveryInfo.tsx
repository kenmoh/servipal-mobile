import React, { useContext, useState } from "react";
import {
    StyleSheet,
    ScrollView,
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { DeliverySchema } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";
import { ThemeContext } from "@/context/themeContext";
import { useCart } from "@/components/CartProvider";
import { fetchCoordinatesFromHere, fetchSuggestions, fetchTravelTime } from "@/api/maps";

const DliveryInfo = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
    const [showDestinationSuggestions, setShowDestinationSuggestions] =
        useState(false);
    const [originCoords, setOriginCoords] = useState<[number, number] | null>(null);
    const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null);

    const { storeId } = useLocalSearchParams();

    const { setDeliveryInfo } = useCart();

    return (
        <View
            style={{
                backgroundColor: activeColor.background,
                flex: 1,
                justifyContent: "center",
            }}
        >
            <StatusBar style="auto" />
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Formik
                        initialValues={{
                            origin: "",
                            destination: "",
                            additional_info: "",
                            distance: "",
                            duration: "",
                        }}
                        onSubmit={(values) => {
                            setDeliveryInfo({
                                ...values,
                                distance: Number(values.distance),
                            });
                            router.push({ pathname: "/cart", params: { storeId } });
                        }}
                        validationSchema={DeliverySchema}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => {
                            const { data: originSuggestions } = useQuery({
                                queryKey: ["origin", values.origin],
                                queryFn: () => fetchCoordinatesFromHere(values.origin),
                                enabled: values.origin.length > 2 && showOriginSuggestions,
                                staleTime: 5000,
                            });
                            // const { data: originSuggestions } = useQuery({
                            //     queryKey: ["origin", values.origin],
                            //     queryFn: () => fetchSuggestions(values.origin),
                            //     enabled: values.origin.length > 2 && showOriginSuggestions,
                            //     staleTime: 5000,
                            // });
                            // const { data: destinationSuggestions } = useQuery({
                            //     queryKey: ["destination", values.destination],
                            //     queryFn: () => fetchSuggestions(values.destination),
                            //     enabled:
                            //         values.destination.length > 2 && showDestinationSuggestions,
                            //     staleTime: 5000,
                            // });
                            const { data: destinationSuggestions } = useQuery({
                                queryKey: ["destination", values.destination],
                                queryFn: () => fetchCoordinatesFromHere(values.destination),
                                enabled:
                                    values.destination.length > 2 && showDestinationSuggestions,
                                staleTime: 5000,
                            });


                            return (
                                <>
                                    <View style={styles.container}>
                                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                            <CustomTextInput
                                                onChangeText={(text) => {
                                                    handleChange("origin")(text);
                                                    setShowOriginSuggestions(true);
                                                }}
                                                value={values.origin}
                                                labelColor={activeColor.text}
                                                label="origin"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                            />
                                            {showOriginSuggestions &&
                                                originSuggestions &&
                                                originSuggestions.length > 0 && (
                                                    <ScrollView style={styles.suggestionContainer}>
                                                        {originSuggestions.map((item) => (
                                                            <TouchableOpacity
                                                                key={item.id}
                                                                onPress={() => {

                                                                    handleChange("origin")(
                                                                        item.place_name
                                                                    );
                                                                    setOriginCoords(item.geometry.coordinates as [number, number]);
                                                                    setShowOriginSuggestions(false);
                                                                }}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        styles.suggestion,
                                                                        {
                                                                            color: activeColor.text,
                                                                            backgroundColor: activeColor.background,
                                                                        },
                                                                    ]}
                                                                >
                                                                    {item.place_name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </ScrollView>
                                                )}
                                            {touched.origin && errors.origin && (
                                                <InputErrorMessage error={errors.origin} />
                                            )}
                                            <CustomTextInput
                                                onChangeText={(text) => {
                                                    handleChange("destination")(text);
                                                    setShowDestinationSuggestions(true);
                                                }}
                                                value={values.destination}
                                                labelColor={activeColor.text}
                                                label="destination"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                            />
                                            {showDestinationSuggestions &&
                                                destinationSuggestions &&
                                                destinationSuggestions.length > 0 && (
                                                    <ScrollView
                                                        style={[
                                                            styles.suggestionContainer,
                                                            { borderColor: activeColor.borderColor },
                                                        ]}
                                                    >
                                                        {destinationSuggestions.map((item) => (
                                                            <TouchableOpacity
                                                                key={item.id}
                                                                onPress={() => {
                                                                    handleChange("destination")(item.place_name);
                                                                    setDestinationCoords(item.geometry.coordinates as [number, number]);
                                                                    setShowDestinationSuggestions(false);

                                                                    if (originCoords) {


                                                                        fetchTravelTime(originCoords, item.geometry.coordinates as [number, number])
                                                                            .then((duration) => {

                                                                                handleChange('duration')(Number(duration[0].duration / 60).toFixed(0));
                                                                                handleChange('distance')(Number(duration[0].distance / 1000).toFixed(2));
                                                                            });
                                                                    }
                                                                }}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        styles.suggestion,
                                                                        {
                                                                            color: activeColor.text,
                                                                            backgroundColor: activeColor.background,
                                                                            borderBottomColor:
                                                                                activeColor.borderColor,
                                                                        },
                                                                    ]}
                                                                >
                                                                    {item.place_name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </ScrollView>
                                                )}

                                            {touched.destination && errors.destination && (
                                                <InputErrorMessage error={errors.destination} />
                                            )}
                                            <View style={{ flexDirection: 'row', gap: 20 }}>
                                                <View style={{ flex: 1 }}>
                                                    <CustomTextInput
                                                        onChangeText={handleChange("distance")}
                                                        value={values.distance}
                                                        labelColor={activeColor.text}
                                                        label="distance"
                                                        inputBackgroundColor={activeColor.inputBackground}
                                                        inputTextColor={activeColor.text}
                                                        editable={false}

                                                    />
                                                    {touched.distance && errors.distance && (
                                                        <InputErrorMessage error={errors.distance} />
                                                    )}
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <CustomTextInput
                                                        onChangeText={handleChange("duration")}
                                                        value={values.duration}
                                                        labelColor={activeColor.text}
                                                        label="duration"
                                                        inputBackgroundColor={activeColor.inputBackground}
                                                        inputTextColor={activeColor.text}
                                                        editable={false}

                                                    />

                                                </View>


                                            </View>

                                        </View>
                                    </View>
                                    <View style={styles.container}>
                                        <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                            <CustomTextInput
                                                label="Additional Info"
                                                onChangeText={handleChange("additional_info")}
                                                value={values.additional_info}
                                                multiline
                                                numberOfLines={4}
                                                textAlignVertical="top"
                                                inputBackgroundColor={activeColor.inputBackground}
                                                inputTextColor={activeColor.text}
                                                labelColor={activeColor.text}
                                                borderRadius={50}
                                            />
                                            {touched.additional_info && errors.additional_info && (
                                                <InputErrorMessage error={errors.additional_info} />
                                            )}

                                            <View style={styles.btnContainer}>
                                                <CustomBtn
                                                    label="submit"
                                                    btnBorderRadius={50}
                                                    btnHeight={50}
                                                    btnColor="orange"
                                                    onPress={handleSubmit}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </>
                            );
                        }}
                    </Formik>
                </ScrollView>
            </View>
        </View>
    );
};

export default DliveryInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    mainContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        // alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: "gray",
        marginVertical: 10,
        textTransform: "uppercase",
        fontFamily: "Poppins-Regular",
    },
    btnContainer: {
        marginVertical: 20,
    },
    suggestionContainer: {
        maxHeight: 180,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        marginBottom: 10,
    },
    suggestion: {
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
