import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, usePathname, withLayoutContext } from "expo-router";
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
import CustomPickerTextInput from "@/components/AppModal";
import OrderTypePicker from "@/components/OrderTypePicker";

const StatTabBar = withLayoutContext(createMaterialTopTabNavigator().Navigator);

interface StatType {
    total_orders: number;
    total_pending_orders: number;
}
interface OrderType {
    name: string;
    id: number;
}
const orderData = [
    { id: 1, name: 'delivery' },
    { id: 2, name: 'food' },
    { id: 3, name: 'laundry' },
]
const StatLayout = () => {
    const { theme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const { user } = useAuth();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const pathname = usePathname()

    const determineOrderType = (path: string) => {
        if (path === '/stats') return 'delivery';
        if (path === '/stats/food') return 'food';
        return 'laundry';
    };

    const [orderType, setOrderType] = useState(() => determineOrderType(pathname));

    const { data: stat }: UseQueryResult<StatType, Error> = useQuery({
        queryKey: ["stats", user?.id],
        queryFn: ordersApi.getUserOrderStats,
    });


    useEffect(() => {
        setOrderType(determineOrderType(pathname));
    }, [pathname]);

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
                        orderType: orderType,
                    }}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={SearchValidation}
                >
                    {({
                        handleChange,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => {

                        useEffect(() => {
                            setFieldValue("orderType", determineOrderType(pathname));
                        }, [pathname]);

                        const { refetch, isFetching } = useQuery({
                            queryKey: ["filteredOrder", orderType, values.startDate, values.endDate],
                            queryFn: () => ordersApi.filterOrderByDateRange(values.startDate, values.endDate, orderType),
                            enabled: false
                        });

                        const handleFetchData = async () => {
                            const result = await refetch();
                            if (result.data) {
                                router.push({
                                    pathname: 'searchResult',
                                    params: { searchResult: JSON.stringify(result?.data) }
                                })
                            }
                        };
                        return (
                            <>
                                {/* {isFetching && <ActivityIndicator size={30} color={activeColor.icon} />} */}
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
                                            onChangeText={handleChange("orderType")}
                                            value={values.orderType}
                                            placeholder="Order Type"
                                            editable={false}

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
                                            maxHeight: 35
                                        }}
                                        onPress={handleFetchData}
                                    >
                                        {isFetching ? <ActivityIndicator color={activeColor.icon} /> : <Text style={{ color: activeColor.text }}>Search</Text>}
                                    </TouchableOpacity>
                                </View>
                                {showStartDate && (
                                    <DateTimePicker
                                        testID="startDatePicker"
                                        value={
                                            values.startDate ? new Date(values.startDate) : new Date()
                                        }
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowStartDate(Platform.OS === "ios");
                                            if (selectedDate) {
                                                const formattedDate = `${selectedDate.getFullYear()}-${String(
                                                    selectedDate.getMonth() + 1
                                                ).padStart(2, "0")}-${String(
                                                    selectedDate.getDate()
                                                ).padStart(2, "0")}`;

                                                setFieldValue("startDate", formattedDate);
                                            }
                                        }}
                                    />
                                )}
                                {showEndDate && (
                                    <DateTimePicker
                                        testID="endDatePicker"
                                        value={values.endDate ? new Date(values.endDate) : new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowEndDate(Platform.OS === "ios");
                                            if (selectedDate) {
                                                const formattedDate = `${selectedDate.getFullYear()}-${String(
                                                    selectedDate.getMonth() + 1
                                                ).padStart(2, "0")}-${String(
                                                    selectedDate.getDate()
                                                ).padStart(2, "0")}`;
                                                setFieldValue("endDate", formattedDate);
                                            }
                                        }}
                                    />
                                )}
                            </>
                        )
                    }
                    }
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
