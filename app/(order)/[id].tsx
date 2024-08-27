import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Divider from "@/components/Divider";
import DetailLabel from "@/components/DetailLabel";
import Status from "@/components/Status";
import { Colors } from "@/constants/Colors";
import ordersApi from "@/api/orders";
import { ItemOrderType } from "@/utils/types";
import CustomBtn from "@/components/CustomBtn";
import { useContext, useMemo } from "react";
import { ThemeContext } from "@/context/themeContext";
import { useAuth } from "@/auth/authContext";

const IMG_HEIGHT = 300;

export default function HomeScreen() {
  const { id, orderType } = useLocalSearchParams();

  const { user } = useAuth();

  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  // Get order details
  // const { data, error, isFetching } = useQuery({
  //   queryKey: ["orders", id],
  //   queryFn: () => ordersApi.orderItemDetails(id),
  // });
  console.log(orderType)
  const fetchOrder = useMemo(() => {
    if (orderType === 'delivery') {
      return ordersApi.orderItemDetails;
    } else if (orderType === 'food') {
      return ordersApi.getFoodDetails;
    } else {
      return ordersApi.getLaundryDetails;
    }
    // switch (orderType) {
    //   case 'delivery':
    //     return ordersApi.orderItemDetails;
    //   case 'food':
    //     return ordersApi.getFoodDetails;
    //   case 'laundry':
    //     return ordersApi.getLaundryDetails;
    //   default:
    //     throw new Error(`Unknown order type: ${orderType}`);
    // }
  }, [orderType]);

  // Fetch order details
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['order', orderType, id],
    queryFn: () => fetchOrder(id),
  });


  // Handle order Pickup
  const { mutate: handlePickup, data: pickupData, isPending } = useMutation({
    mutationFn: () => ordersApi.pickUpOrder(id),
  });

  // Handle order Delivered
  const { mutate: handleDelivered, isPending: delivered } = useMutation({
    mutationFn: () => ordersApi.orderDelievered(id),
  });

  // Handle order Received
  const { mutate: handleReceived, isPending: received } = useMutation({
    mutationFn: () => ordersApi.orderReceived(id),
  });

  // Handle vendor cancel order
  const { mutate: handleCancelOrderByVebdor } = useMutation({
    mutationFn: () => ordersApi.cancelOrderByVendor(id),
  });

  // Handle rider cancel order
  const { mutate: handleRiderCancelOrder } = useMutation({
    mutationFn: () => ordersApi.cancelOrder(id),
  });

  // Handle vendor relist order
  const { mutate: handleRelistOrderByVebdor } = useMutation({
    mutationFn: () => ordersApi.relistOrderByVendor(id),
  });





  if (isFetching) {
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

  const order: ItemOrderType = data?.data;

  return (
    <View
      style={{
        backgroundColor: activeColor.background,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} backgroundColor={activeColor.background} />
      <View style={[styles.mainContainer]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <Image
            source={order?.image_url}
            // placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={styles.image}
          />

          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={{
                marginTop: 25,
                marginBottom: 10,
                textTransform: "uppercase",
                fontSize: 16,
                fontWeight: "bold",
                color: activeColor.text,
              }}
            >
              Order Details
            </Text>
            <View
              style={{
                marginBottom: 25,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Status
                text={order?.order_status!}
                textColor={
                  order?.order_status === "Pending"
                    ? "#c8553d"
                    : order?.order_status === "Received"
                      ? "#25a18e"
                      : order?.order_status === "Delivered"
                        ? "#27187e"
                        : "#e8ac65"
                }
              />
              <TouchableOpacity
                hitSlop={25}
                onPress={() =>
                  router.push({
                    pathname: "/orderMap",
                    params: {
                      id,
                      distance: order?.distance,
                      cost: order?.total_cost,
                      origin: order?.origin,
                      destination: order?.destination,
                    },
                  })
                }
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                  borderWidth: 1.5,
                  borderColor: activeColor.tabIconDefault,
                  borderRadius: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                }}
              >
                <Ionicons
                  name="map-outline"
                  size={24}
                  color={activeColor.tabIconDefault}
                />
                <Text style={{ color: activeColor.tabIconDefault }}>
                  View on map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <AntDesign name="user" size={30} color="gray" />
              <Divider />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <Text style={[styles.text, { color: activeColor.text }]}>
                Sender Details
              </Text>
              <View>
                <DetailLabel
                  lable="Name"
                  value={order?.vendor_username || order?.order_owner_username!}
                />
                <DetailLabel
                  lable="Phone"
                  value={order?.vendor_phone_number || ""}
                />
                <DetailLabel lable="Location" value={order?.origin || ""} />
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <Feather name="box" size={30} color={activeColor.icon} />
              <Divider />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <Text style={[styles.text, { color: activeColor.text }]}>
                Order Details
              </Text>
              <View>
                <DetailLabel lable="Name" value={order?.package_name || order?.order_owner_username!} />
                <DetailLabel lable="Origin" value={order?.origin || ""} />
                <DetailLabel
                  lable="Destination"
                  value={order?.destination || ""}
                />
                <DetailLabel lable="Distance" value={order?.distance || ""} />
                <DetailLabel lable="Total Cost" value={order?.total_cost} />
                <DetailLabel lable="Commission" value={order?.commission_delivery!} />
                <DetailLabel
                  lable="Amount payable"
                  value={order?.amount_payable_delivery}
                />
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: activeColor.tabIconDefault,
                      marginBottom: 5,
                      fontFamily: 'Poppins-Light'
                    }}
                  >
                    Description:
                  </Text>
                  <Text
                    style={{ fontSize: 13, color: activeColor.tabIconDefault, fontFamily: 'Poppins-Light' }}
                  >
                    {order?.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {order.order_status !== 'Pending' && (<View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons name="bike-fast" size={30} color="grey" />
              <Divider />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <Text style={[styles.text, { color: activeColor.text }]}>
                Rider Details
              </Text>
              <DetailLabel lable="Rider Name" value={order?.rider_name || ""} />
              <DetailLabel
                lable="Phone Number"
                value={order?.rider_phone_number!}
              />
              <DetailLabel
                lable="Company Name"
                value={order?.dispatch_company_name || ""}
              />

            </View>
          </View>)}
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <View style={{ flex: 1 }}>
          {
            (order?.order_status === 'Pending' && user?.user_type === 'rider') ? (<CustomBtn
              disabled={isPending}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="Pickup"
              onPress={handlePickup}
            />) : (order?.order_status === 'Picked up' && user?.user_type === 'rider') ? (<CustomBtn
              disabled={delivered}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="Delivered"
              onPress={handleDelivered}
            />) : (order?.order_status === 'Delivered' && user?.user_type === 'vendor') ? (<CustomBtn
              disabled={received}
              btnBorderRadius={50}
              btnColor={Colors.btnPrimaryColor}
              label="Received"
              onPress={handleReceived}
            />) : order.order_status === 'Received' && (
              <CustomBtn
                btnBorderRadius={50}
                btnColor={Colors.btnPrimaryColor}
                label="Completed"

              />
            )
          }
        </View>

        {order?.payment_status != 'paid' && (<View style={{ width: 100 }}>
          <CustomBtn
            btnBorderRadius={50}
            btnColor={Colors.primaryBtnColor}
            label="Pay"
            onPress={
              () => router.push({
                pathname: "/payment",
                params: { paymentUrl: order?.payment_url, id: order?.id, totalCost: order?.total_cost },
              })
            }
          />
        </View>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  mainContainer: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,

    marginVertical: 10,
    textTransform: "uppercase",
    fontFamily: 'Poppins-SemiBold'
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 10

  },
  image: {
    height: IMG_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
});
