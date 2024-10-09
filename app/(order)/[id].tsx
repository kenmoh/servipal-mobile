import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import DetailLabel from "@/components/DetailLabel";
import { Colors } from "@/constants/Colors";
import ordersApi from "@/api/orders";
import CustomBtn from "@/components/CustomBtn";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";
import { showMessage } from "react-native-flash-message";
import { SIZES } from "@/constants/Sizes";

const IMG_HEIGHT = 300;

export default function HomeScreen() {
  const { user } = useAuth();

  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  const {
    orderId,
    imageUrl,
    orderStatus,
    packageName,
    // foods,
    // laundries,
    userId,
    orderNumber,
    items,
    deliveryFee,
    amountDueVendor,
    amountDueDispatch,
    commissionDispatch,
    commissionItem,
    totalCost,
    paymntStatus,
    paymentUrl,
    vendorPhoneNumber,
    origin,
    destination,
    distance,
    orderOwnerPhoneNumber,
    orderOwnerUsername,
    dispatchCompanyName,
    riderPhoneNumber,
    plateNumber,
    dispatchCompanyPhoneNumber,
    itemCost,
    orderType,
    vendorUsername,
    riderName,
    description,
  } = useLocalSearchParams();

  // Handle order Pickup
  const {
    data,
    error: pickupError,
    mutate: handlePickup,
    isPending,
  } = useMutation({
    mutationFn: () => ordersApi.pickUpOrder(orderId as string),
    onSuccess: () => {
      showMessage({
        message: "Order Picked up",
        type: "success",
      });
      router.push("(tabs)/stats");
    },
    onError: () => {
      showMessage({
        message: pickupError?.message!, // TODO: handle this error
        type: "danger",
      });
    },
  });

  // Handle order Delivered
  const { mutate: handleDelivered, isPending: pendingDelivery } = useMutation({
    mutationFn: () => ordersApi.orderDelievered(orderId as string),
    onSuccess: () => {
      showMessage({
        message: "Order Delivered",
        type: "success",
      });
      router.push("(tabs)/stats");
    },
    onError: () => {
      showMessage({
        message: "Fail to complete",
        type: "danger",
      });
      router.push("(tabs)/stats");
    },
  });

  // Handle order Received
  const {
    mutate: handleReceived,
    isPending: orderRecivedPending,
    data: receivedData,
  } = useMutation({
    mutationFn: () => ordersApi.orderReceived(orderId as string),
    onSuccess: () => {
      showMessage({
        message: "Order Completed",
        type: "success",
      });
      router.push("(tabs)/stats");
    },
    onError: () => {
      showMessage({
        message: "Fail to complete",
        type: "danger",
      });
      router.push("(tabs)/stats");
    },
  });
  // Handle order Received
  const {
    mutate: handleLaundryReceived,
    isPending: laundryReceivedPending,
    data: laundryData,
  } = useMutation({
    mutationFn: () => ordersApi.laundryOrderReceived(orderId as string),
    onSuccess: () => {
      showMessage({
        message: "Order Completed",
        type: "success",
      });
      router.push("(tabs)/stats");
    },
    onError: () => {
      showMessage({
        message: "Fail to complete",
        type: "danger",
      });
      router.push("(tabs)/stats");
    },
  });

  // Handle vendor cancel order
  const { mutate: handleCancelOrderByVendor } = useMutation({
    mutationFn: () => ordersApi.cancelOrderByVendor(orderId as string),
    onSuccess: () => {
      showMessage({
        message: "Order Cancelled",
        type: "success",
      });
      router.push("(tabs)/stats");
    },
    onError: () => {
      showMessage({
        message: "Fail to cancel",
        type: "danger",
      });
      router.push("(tabs)/stats");
    },
  });

  // Handle rider cancel order
  const { mutate: handleRiderCancelOrder, isPending: riderCancelPending } =
    useMutation({
      mutationFn: () => ordersApi.cancelOrder(orderId as string),
      onSuccess: () => {
        showMessage({
          message: "Order Cancelled",
          type: "success",
        });
        router.push("(tabs)/stats");
      },
      onError: () => {
        showMessage({
          message: "Fail to cancel",
          type: "danger",
        });
        router.push("(tabs)/stats");
      },
    });

  // Handle vendor relist order
  const { mutate: handleRelistOrderByVendor, isPending: relistPending } =
    useMutation({
      mutationFn: () => ordersApi.relistOrderByVendor(orderId as string),
      onSuccess: () => {
        showMessage({
          message: "Order listed for delivery",
          type: "success",
        });
        router.push("(tabs)/stats");
      },
      onError: () => {
        showMessage({
          message: "Something went wrong. Please try again!",
          type: "danger",
        });
        router.push("(tabs)/stats");
      },
    });

  if (
    isPending ||
    riderCancelPending ||
    relistPending ||
    orderRecivedPending ||
    laundryReceivedPending ||
    pendingDelivery
  ) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: activeColor.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={30} color={activeColor.tabIconDefault} />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: activeColor.background,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar
        style={theme.mode === "dark" ? "light" : "dark"}
        backgroundColor={activeColor.background}
      />
      <View style={[styles.mainContainer]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <Image
            source={imageUrl}
            contentFit="cover"
            transition={1000}
            style={styles.image}
          />

          <View style={{ paddingHorizontal: 15 }}>
            <View
              style={{
                marginBottom: 25,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              {/* <Status
                text={orderStatus}
                textColor={
                  orderStatus === "pending"
                    ? "tomato"
                    : orderStatus === "received"
                      ? "#25a18e"
                      : orderStatus === "delivered"
                        ? "skyblue"
                        : "#e8ac65"
                }
                /> */}

              {paymntStatus === "paid" &&
                orderType !== "delivery" &&
                orderStatus === "received" &&
                user?.phone_number === orderOwnerPhoneNumber && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "addReview",
                        params: { orderId },
                      })
                    }
                  >
                    <Text
                      style={[styles.linkText, { color: activeColor.text }]}
                    >
                      Add Review
                    </Text>
                  </TouchableOpacity>
                )}

              {paymntStatus === "paid" &&
                (user?.company_name === dispatchCompanyName ||
                  user?.phone_number === riderPhoneNumber ||
                  user?.phone_number === orderOwnerPhoneNumber ||
                  user?.phone_number === vendorPhoneNumber) && (
                  <TouchableOpacity hitSlop={25} onPress={() => router.push({
                    pathname: '/(order)/dispute',
                    params: { orderId, orderNumber }
                  })}>
                    <Text
                      style={[styles.linkText, { color: activeColor.text }]}
                    >
                      Open Dispute
                    </Text>
                  </TouchableOpacity>
                )}

              <TouchableOpacity
                hitSlop={25}
                onPress={() =>
                  router.push({
                    pathname: "/orderMap",
                    params: {
                      orderId,
                      distance: distance,
                      cost: totalCost,
                      origin: origin,
                      destination: destination,
                    },
                  })
                }
                style={
                  {
                    // justifyContent: "center",
                    // alignItems: "center",
                    // flexDirection: "row",
                    // // gap: 5,
                    // // borderWidth: 1.5,
                    // borderColor: activeColor.tabIconDefault,
                    // // borderRadius: 20,
                    // // paddingVertical: 5,
                    // paddingHorizontal: SIZES.paddingMedium,
                  }
                }
              >
                {/* <Ionicons
                  name="map-outline"
                  size={24}
                  color={activeColor.tabIconDefault}
                /> */}
                <Text
                  style={{
                    color: activeColor.tabIconDefault,
                    textDecorationLine: "underline",
                  }}
                >
                  View on map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.container,
              { backgroundColor: activeColor.profileCard },
            ]}
          >
            <View>
              <View style={styles.header}>
                <AntDesign name="user" size={18} color={activeColor.text} />
                <Text style={[styles.text, { color: activeColor.text }]}>
                  Sender Details
                </Text>
              </View>
              <View>
                <DetailLabel
                  lable="Name"
                  value={vendorUsername || orderOwnerUsername}
                />
                <DetailLabel
                  lable="Phone"
                  value={orderOwnerPhoneNumber || ""}
                />
                <DetailLabel lable="Location" value={origin || ""} />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.container,
              { backgroundColor: activeColor.profileCard },
            ]}
          >
            <View>
              <View style={styles.header}>
                <Feather name="box" size={20} color={activeColor.text} />
                <Text style={[styles.text, { color: activeColor.text }]}>
                  Order Details
                </Text>
              </View>
              <View>
                <DetailLabel lable="Name" value={packageName} />
                <DetailLabel lable="Origin" value={origin || ""} />
                <DetailLabel lable="Destination" value={destination || ""} />
                <DetailLabel lable="Distance" value={distance || ""} />
                {(user?.username === orderOwnerUsername || user?.phone_number === vendorPhoneNumber) &&
                  orderType === "food" && (
                    <>
                      <DetailLabel lable="Delivery Fee" value={deliveryFee} />
                      <DetailLabel lable="Food Cost" value={itemCost} />
                      <DetailLabel lable="Total Cost" value={totalCost} />
                    </>
                  )}
                {user?.username === vendorUsername && (
                  <DetailLabel lable="Delivery Fee" value={deliveryFee} />
                )}
                {user?.phone_number === vendorPhoneNumber &&
                  orderType === "food" && (
                    <DetailLabel lable="Food Cost" value={itemCost} />
                  )}
                {user?.user_type === "Dispatch Provider" ||
                  (user?.user_type === "Rider" && (
                    <DetailLabel
                      lable="Service Charge"
                      value={commissionDispatch}
                    />
                  ))}
                {user?.user_type === "Restaurant Service Provider" && (
                  <DetailLabel lable="Service Charge" value={commissionItem} />
                )}
                {user?.user_type === "Laundry Service Provider" && (
                  <DetailLabel lable="Service Charge" value={commissionItem} />
                )}
                {(user?.phone_number === dispatchCompanyPhoneNumber ||
                  user?.phone_number === riderPhoneNumber) && (
                    <DetailLabel lable="Amount Due" value={amountDueDispatch} />
                  )}
                {user?.phone_number === vendorPhoneNumber && (
                  <DetailLabel lable="Amount Due" value={amountDueVendor} />
                )}
                {description && (
                  <View style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: activeColor.tabIconDefault,
                        marginBottom: 5,
                        fontFamily: "Poppins-Light",
                      }}
                    >
                      Description:
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: activeColor.tabIconDefault,
                        fontFamily: "Poppins-Light",
                      }}
                    >
                      {description}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          {orderStatus !== "pending" && (
            <View
              style={[
                styles.container,
                { backgroundColor: activeColor.profileCard },
              ]}
            >
              <View>
                <View style={styles.header}>
                  <MaterialCommunityIcons
                    name="bike-fast"
                    size={20}
                    color={activeColor.text}
                  />
                  <Text style={[styles.text, { color: activeColor.text }]}>
                    Rider Details
                  </Text>
                </View>
                <DetailLabel lable="Rider Name" value={riderName || ""} />
                <DetailLabel lable="Phone Number" value={riderPhoneNumber} />
                <DetailLabel lable="Bike Plate Numbe" value={plateNumber} />
                <DetailLabel
                  lable="Company Name"
                  value={dispatchCompanyName || ""}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <View style={{ marginVertical: 10 }} />
      <View style={styles.btnContainer}>
        <View style={{ flex: 1 }}>
          {orderStatus === "pending" &&
            paymntStatus === "paid" &&
            user?.user_type === "Rider" ? (
            <CustomBtn
              disabled={orderStatus === "pending" ? false : true}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="Pickup"
              onPress={handlePickup}
            />
          ) : orderStatus === "in transit" && user?.user_type === "Rider" ? (
            <CustomBtn
              disabled={orderStatus === "in transit" ? false : true}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="Delivered"
              onPress={handleDelivered}
            />
          ) : orderStatus === "pending" &&
            vendorUsername === user?.username &&
            user?.user_type === "Regular User" ? (
            <CustomBtn
              disabled={false}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="Cancel"
              onPress={handleCancelOrderByVendor}
            />
          ) : orderStatus === "in transit" &&
            user?.user_type === "Rider" &&
            riderPhoneNumber === user?.phone_number ? (
            <CustomBtn
              disabled={false}
              btnBorderRadius={50}
              btnColor={Colors.error}
              label="Cancel"
              onPress={handleRiderCancelOrder}
            />
          ) : orderStatus === "pending" &&
            user?.user_type !== "Regular User" &&
            vendorUsername === user?.username ? (
            <CustomBtn
              disabled={false}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="List order"
              onPress={handleRelistOrderByVendor}
            />
          ) : (user?.phone_number === orderOwnerPhoneNumber &&
            orderStatus === "delivered") ||
            (user?.phone_number === orderOwnerPhoneNumber &&
              orderStatus === "laundry received") ? (
            <CustomBtn
              disabled={false}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="Received"
              onPress={handleReceived}
            />
          ) : orderType === "laundry" &&
            orderStatus === "laundry received" &&
            vendorUsername === user?.company_name ? (
            <CustomBtn
              disabled={false}
              btnBorderRadius={50}
              btnColor={
                orderStatus === "laundry received"
                  ? activeColor.profileCard
                  : Colors.btnPrimaryColor
              }
              label="Laundry Received"
              onPress={handleLaundryReceived}
            />
          ) : (
            orderStatus === "received" && (
              <CustomBtn
                disabled
                btnBorderRadius={50}
                btnColor={"teal"}
                label="Completed"
              />
            )
          )}
        </View>
      </View>
      {paymntStatus != "paid" && user?.username === orderOwnerUsername && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            zIndex: 999,
            width: "90%",
            alignSelf: "center",
          }}
        >
          <CustomBtn
            btnBorderRadius={50}
            btnColor={Colors.primaryBtnColor}
            label="Pay"
            onPress={() =>
              router.push({
                pathname: "/payment",
                params: {
                  paymentUrl: paymentUrl,
                  orderType: orderType,
                  id: orderId,
                  totalCost: totalCost,
                  // items: JSON.stringify(foods) || JSON.stringify(laundries),
                  items,
                  deliveryFee,
                  itemCost: itemCost || "",
                },
              })
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    paddingHorizontal: SIZES.paddingMedium,
    paddingVertical: SIZES.paddingSmall,
    marginVertical: 5,
  },
  mainContainer: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  text: {
    fontSize: 12,
    marginVertical: 10,
    textTransform: "uppercase",
    fontFamily: "Poppins-SemiBold",
  },
  btnContainer: {
    position: "absolute",
    bottom: 5,
    width: "90%",
    alignSelf: "center",
  },

  image: {
    height: IMG_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  linkText: {
    fontSize: 12,
    textTransform: "capitalize",
    fontFamily: "Poppins-Regular",
    textDecorationLine: "underline",
  },
});
