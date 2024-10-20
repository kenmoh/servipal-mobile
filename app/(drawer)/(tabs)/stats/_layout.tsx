import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useState } from "react";
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAuth } from "@/auth/authContext";
import ordersApi from "@/api/orders";
import { SIZES } from "@/constants/Sizes";
import AppDateInputPicker from "@/components/AppDateInputPicker";
import { SearchValidation } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";

const StatTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

interface StatType {
    total_orders: number;
    total_pending_orders: number;
}
const StatLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const { data: stat }: UseQueryResult<StatType, Error> = useQuery({
        queryKey: ["stats", user?.id],
        queryFn: ordersApi.getUserOrderStats,
    });

    return (
        <>
            <View
                style={[
                    styles.statWrapper,
                    {
                        backgroundColor: activeColor.background,
                        borderBottomColor: activeColor.profileCard,
                    },
                ]}
            >
                <View style={[styles.statContainer]}>
                    <Feather name="package" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        Total Orders: {stat?.total_orders}
                    </Text>
                </View>
                <View style={[styles.statContainer]}>
                    <MaterialIcons name="pending" color={activeColor.icon} size={18} />
                    <Text style={[styles.text, { color: activeColor.text }]}>
                        Pending Orders: {stat?.total_pending_orders}
                    </Text>
                </View>
            </View>
            <View
                style={[
                    {
                        backgroundColor: activeColor.background,
                        borderBottomColor: activeColor.profileCard,
                    },
                ]}
            >
                <Formik
                    initialValues={{
                        startDate: "",
                        endDate: "",
                        orderType: "",
                    }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={SearchValidation}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <>
                            <View style={[styles.inputContainer, { gap: 10 }]}>
                                <View style={{ flex: 1 }}>
                                    <AppDateInputPicker
                                        onChangeText={handleChange("startDate")}
                                        value={values.startDate}
                                        placeholder="Start Date"
                                        onPress={() => setShowStartDate(true)}
                                    />
                                    {touched.startDate && errors.startDate && (
                                        <InputErrorMessage error={errors.startDate} />
                                    )}
                                </View>
                                <View style={{ flex: 1 }}>
                                    <AppDateInputPicker
                                        onChangeText={handleChange("endDate")}
                                        value={values.endDate}
                                        placeholder="End Date"
                                        onPress={() => setShowEndDate(true)}
                                    />
                                    {touched.endDate && errors.endDate && (
                                        <InputErrorMessage error={errors.endDate} />
                                    )}
                                </View>
                            </View>
                            <View style={[styles.inputContainer, { gap: 10 }]}>
                                <View style={{ width: "70%" }}>
                                    <AppDateInputPicker
                                        placeholder="Order Type"
                                        onChangeText={handleChange("orderType")}
                                        value={values.orderType}
                                    />
                                    {touched.orderType && errors.orderType && (
                                        <InputErrorMessage error={errors.orderType} />
                                    )}
                                </View>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: activeColor.profileCard,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 20,
                                        borderCurve: "continuous",
                                    }}
                                    onPress={handleSubmit}
                                >
                                    <Text style={{ color: activeColor.text }}>Search</Text>
                                </TouchableOpacity>
                            </View>
                            {showStartDate && (
                                <DateTimePicker
                                    testID="startDatePicker"
                                    value={
                                        values.startDate
                                            ? new Date(values.startDate)
                                            : new Date()
                                    }
                                    mode="date"

                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowStartDate(Platform.OS === "ios");
                                        if (selectedDate) {
                                            const formattedTime = selectedDate
                                                .toLocaleDateString()

                                            setFieldValue("startDate", formattedTime);
                                        }
                                    }}
                                />
                            )}
                            {showEndDate && (
                                <DateTimePicker
                                    testID="endDatePicker"
                                    value={
                                        values.endDate
                                            ? new Date(values.endDate)
                                            : new Date()
                                    }
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowEndDate(Platform.OS === "ios");
                                        if (selectedDate) {
                                            const formattedTime = selectedDate
                                                .toLocaleDateString()
                                            setFieldValue("endDate", formattedTime);
                                        }
                                    }}
                                />
                            )}
                        </>
                    )}
                </Formik>
            </View>
            <StatTabBar
                screenOptions={{
                    tabBarLabelStyle: {
                        color: activeColor.tabIconDefault,
                        fontSize: 12,
                        textAlign: "center",
                        textTransform: "capitalize",
                        fontFamily: "Poppins-Bold",
                    },
                    tabBarActiveTintColor: activeColor.text,
                    tabBarInactiveTintColor: activeColor.icon,
                    tabBarAndroidRipple: { borderless: false, color: activeColor.icon },

                    tabBarPressColor: "gray",
                    swipeEnabled: false,
                    tabBarStyle: {
                        borderBottomColor: activeColor.borderColor,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        elevation: 0,
                        shadowOpacity: 0,
                        backgroundColor: activeColor.background,
                    },
                }}
            >
                <StatTabBar.Screen name="index" options={{ title: "Package" }} />
                <StatTabBar.Screen name="food" options={{ title: "Food" }} />
                <StatTabBar.Screen name="laundry" options={{ title: "Laundry" }} />
            </StatTabBar>
        </>
    );
};

export default StatLayout;

const styles = StyleSheet.create({
    statContainer: {
        flexDirection: "row",
        gap: 5,
    },
    statWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: SIZES.paddingSmall,
        borderWidth: StyleSheet.hairlineWidth,
    },
    text: {
        fontFamily: "Poppins-Regular",
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.paddingSmall,
        // width: '100%'
    },
});
