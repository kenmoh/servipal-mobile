import React, { useContext, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Location from "expo-location";

import ImagePickerForm from "@/components/ImageFormPicker";
import CustomBtn from "@/components/CustomBtn";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { orderValidationSchema } from "@/utils/orderValidation";
import InputErrorMessage from "@/components/InputErrorMessage";
import orderApi from "@/api/orders";
import { ThemeContext } from "@/context/themeContext";
import { CreateOrderType } from "@/utils/types";
import { showMessage } from "react-native-flash-message";
import CustomActivityIndicator from "@/components/CustomActivityIndicator";
import { fetchCoordinatesFromHere, getDistanceAndDuration } from "@/api/maps";
import { MaterialIcons } from "@expo/vector-icons";

type OrderItemType = {
  payment_url: string;
  order_type: string;
  id: string;
  total_cost: number;
  delivery_fee: number;
};

type Data = {
  item_order: OrderItemType;
};

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);
  const [originCoords, setOriginCoords] = useState<[number, number] | null>(
    null
  );
  const [destinationCoords, setDestinationCoords] = useState<
    [number, number] | null
  >(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (order: CreateOrderType) => orderApi.createOrder(order),
    onError: (error: Error) => {
      showMessage({
        message: error.message,
        type: "danger",
        style: {
          alignItems: "center",
        },
      });
      router.push("/(order)/createOrder");
    },
    onSuccess: (data: Data) => {
      showMessage({
        message: "Order added successfully.",
        type: "success",
        style: {
          alignItems: "center",
        },
      });
      router.push({
        pathname: "payment",
        params: {
          paymentUrl: data?.item_order.payment_url,
          orderType: data?.item_order.order_type,
          id: data?.item_order.id,
          totalCost: data?.item_order.total_cost,
          deliveryFee: data?.item_order.delivery_fee,
        },
      });
    },
  });

  return (
    <View
      style={{
        backgroundColor: activeColor.background,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <CustomActivityIndicator visible={isPending} />
      <StatusBar style="inverted" />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              name: "",
              description: "",
              origin: "",
              destination: "",
              duration: "",
              distance: "",
              originPoints: originCoords
                ? `${originCoords[0], originCoords[1]}`
                : '0, 0',
              destinationPoints: destinationCoords
                ? `${destinationCoords[0], destinationCoords[1]}`
                : '0, 0',
              orderPhotoUrl: "",
            }}
            onSubmit={(values, { resetForm }) =>
              mutate(values, { onSuccess: () => resetForm() })
            }
            validationSchema={orderValidationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => {
              const { data: originSuggestions } = useQuery({
                queryKey: ["origin", values.origin],
                queryFn: () => fetchCoordinatesFromHere(values.origin),
                enabled: values.origin.length > 2 && showOriginSuggestions,
                staleTime: 5000,
              });

              const { data: destinationSuggestions } = useQuery({
                queryKey: ["origin", values.destination],
                queryFn: () => fetchCoordinatesFromHere(values.destination),
                enabled:
                  values.destination.length > 2 && showDestinationSuggestions,
                staleTime: 5000,
              });

              const getCurrentLocation = async () => {
                try {
                  setIsLoadingLocation(true);
                  const { status } =
                    await Location.requestForegroundPermissionsAsync();
                  if (status !== "granted") {
                    showMessage({
                      message: "Permission to access location was denied",
                      type: "danger",
                      style: { alignItems: "center" },
                    });
                    return;
                  }

                  const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                  });

                  const { latitude, longitude } = location.coords;

                  const reverseGeocode = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                  });

                  if (reverseGeocode && reverseGeocode[0]) {
                    const address = reverseGeocode[0];
                    const formattedAddress = `${address.street || ""} ${address.name || ""
                      }, ${address.city || ""}, ${address.region || ""}`
                      .trim()
                      .replace(/\s+/g, " ");

                    setFieldValue("origin", formattedAddress);
                    setOriginCoords([Number(latitude.toFixed(5)), Number(longitude.toFixed(5))]);
                    setFieldValue("originPoints", [latitude, longitude]);
                    setShowOriginSuggestions(false);

                    showMessage({
                      message: "Location set successfully",
                      type: "success",
                      style: { alignItems: "center" },
                    });
                  }
                } catch (error) {
                  showMessage({
                    message: "Error getting location",
                    type: "danger",
                    style: { alignItems: "center" },
                  });
                } finally {
                  setIsLoadingLocation(false);
                }
              };

              return (
                <>
                  <View style={styles.container}>
                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                      <TouchableOpacity
                        style={[
                          {
                            backgroundColor: activeColor.inputBackground,
                            flexDirection: "row",
                            paddingVertical: 10,
                            alignItems: "center",
                            gap: 5,
                            width: "70%",
                            justifyContent: "center",
                            borderRadius: 25,

                          },
                        ]}
                        onPress={getCurrentLocation}
                      >
                        {isLoadingLocation ? (<>
                          <ActivityIndicator size={24} color={activeColor.icon} />
                          <Text style={{ fontFamily: 'Poppins-Regular', color: activeColor.text }}>Fetching Location...</Text>
                        </>) : (<>
                          <MaterialIcons
                            name="my-location"
                            size={24}
                            color={activeColor.icon}
                          />
                          <Text style={{ fontFamily: 'Poppins-Regular', color: activeColor.text }}>Use current location</Text></>)}
                      </TouchableOpacity>
                      <CustomTextInput
                        onChangeText={(text) => {
                          handleChange("origin")(text);
                          setShowOriginSuggestions(true);
                        }}
                        value={values.origin}
                        labelColor={activeColor.text}
                        label="Pickup Location"
                        inputBackgroundColor={activeColor.inputBackground}
                        inputTextColor={activeColor.text}
                      />
                      {showOriginSuggestions &&
                        originSuggestions &&
                        originSuggestions.length > 0 && (
                          <ScrollView
                            style={[
                              styles.suggestionContainer,
                              {
                                zIndex: 999,
                                position: "absolute",
                                top: 140,
                                borderColor: activeColor.profileCard,
                              },
                            ]}
                            nestedScrollEnabled
                          >
                            {originSuggestions.map((item) => (
                              <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                  handleChange("origin")(item.title);
                                  const newOriginCoords: [number, number] = [
                                    item.position.lat,
                                    item.position.lng,
                                  ];
                                  setOriginCoords(newOriginCoords);
                                  setFieldValue(
                                    "originPoints",
                                    newOriginCoords
                                  );
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
                                  {item.title}
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
                        label="Destination"
                        inputBackgroundColor={activeColor.inputBackground}
                        inputTextColor={activeColor.text}
                      />
                      {showDestinationSuggestions &&
                        destinationSuggestions &&
                        destinationSuggestions.length > 0 && (
                          <ScrollView
                            style={[
                              styles.suggestionContainer,
                              {
                                zIndex: 999,
                                position: "absolute",
                                top: 240,
                                borderColor: activeColor.profileCard,
                              },
                            ]}
                            nestedScrollEnabled
                          >
                            {destinationSuggestions.map((item) => (
                              <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                  handleChange("destination")(item.title);
                                  const newDestCoords: [number, number] = [
                                    item.position.lat,
                                    item.position.lng,
                                  ];
                                  setDestinationCoords(newDestCoords);
                                  setFieldValue(
                                    "destinationPoints",
                                    newDestCoords
                                  );
                                  setShowDestinationSuggestions(false);

                                  if (originCoords) {
                                    getDistanceAndDuration(originCoords, [
                                      item.position.lat,
                                      item.position.lng,
                                    ] as [number, number]).then((calc) => {
                                      handleChange("distance")(
                                        Number(
                                          Number(calc?.distance) / 1000
                                        ).toFixed(2)
                                      );
                                      handleChange("duration")(
                                        Number(
                                          Number(calc?.duration) / 60
                                        ).toFixed(0)
                                      );
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
                                    },
                                  ]}
                                >
                                  {item.title}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
                      {touched.destination && errors.destination && (
                        <InputErrorMessage error={errors.destination} />
                      )}
                      {(values.distance || values.duration) && (
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <View style={{ flex: 1 }}>
                            <CustomTextInput
                              onChangeText={handleChange("distance")}
                              value={values.distance}
                              labelColor={activeColor.text}
                              label="Distance"
                              editable={false}
                              inputBackgroundColor={activeColor.inputBackground}
                              inputTextColor={activeColor.text}
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
                              label="Duration"
                              editable={false}
                              inputBackgroundColor={activeColor.inputBackground}
                              inputTextColor={activeColor.text}
                            />
                            {touched.duration && errors.duration && (
                              <InputErrorMessage error={errors.duration} />
                            )}
                          </View>
                        </View>
                      )}

                      {originCoords && destinationCoords && (
                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <View style={{ flex: 1 }}>
                            <CustomTextInput
                              onChangeText={handleChange("originPoints")}
                              value={
                                originCoords
                                  ? `${originCoords[0]},${originCoords[1]}`
                                  : "0,0"
                              }
                              labelColor={activeColor.text}
                              label="Origin Points"
                              editable={false}
                              inputBackgroundColor={activeColor.inputBackground}
                              inputTextColor={activeColor.text}
                            />
                            {touched.originPoints && errors.originPoints && (
                              <InputErrorMessage error={errors.originPoints} />
                            )}
                          </View>
                          <View style={{ flex: 1 }}>
                            <CustomTextInput
                              onChangeText={handleChange("destinationPoints")}
                              value={
                                destinationCoords
                                  ? `${destinationCoords[0]},${destinationCoords[1]}`
                                  : "0,0"
                              }
                              labelColor={activeColor.text}
                              label="Destination Points"
                              editable={false}
                              inputBackgroundColor={activeColor.inputBackground}
                              inputTextColor={activeColor.text}
                            />
                            {touched.destinationPoints &&
                              errors.destinationPoints && (
                                <InputErrorMessage
                                  error={errors.destinationPoints}
                                />
                              )}
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.container}>
                    <View style={{ flex: 1, paddingHorizontal: 5 }}>
                      <CustomTextInput
                        onChangeText={handleChange("name")}
                        value={values.name}
                        label="Name"
                        inputBackgroundColor={activeColor.inputBackground}
                        inputTextColor={activeColor.text}
                        labelColor={activeColor.text}
                      />
                      {touched.name && errors.name && (
                        <InputErrorMessage error={errors.name} />
                      )}
                      <CustomTextInput
                        label="Description"
                        onChangeText={handleChange("description")}
                        value={values.description}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        inputBackgroundColor={activeColor.inputBackground}
                        inputTextColor={activeColor.text}
                        labelColor={activeColor.text}
                      />
                      {touched.description && errors.description && (
                        <InputErrorMessage error={errors.description} />
                      )}
                      <ImagePickerForm field={"orderPhotoUrl"} />

                      <View style={styles.btnContainer}>
                        <CustomBtn
                          label="submit"
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
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
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    width: "100%",
    alignSelf: "center",
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontFamily: "Poppins-Light",
  },
});
