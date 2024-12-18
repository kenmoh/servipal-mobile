import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { Colors } from "@/constants/Colors";
import { FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { OrderResponseType } from "@/utils/types";
import { memo, useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Status from "./Status";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

dayjs.extend(relativeTime);

const OrderCard = ({
  order,
  isHomeScreen,
}: {
  order: OrderResponseType;
  isHomeScreen?: boolean;
}) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  return (
    <TouchableOpacity

      onPress={() =>
        router.push({
          pathname: `(order)/${order?.id}`,
          params: {
            packageName: order?.package_name || order.order_owner_username,
            senderPhoneNumber: order?.order_owner_phone_number,
            imageUrl:
              order?.order_type === "delivery"
                ? order?.image_url
                : order.order_type === "food"
                  ? order?.foods[0].image_url
                  : order.order_type === "laundry" &&
                  order?.laundries[0].image_url,
            itemCost: order?.item_cost || null,
            items:
              JSON.stringify(order?.foods) || JSON.stringify(order?.laundries),
            amountDueVendor: order?.amount_due_vendor,
            amountDueDispatch: order?.amount_due_dispatch,
            totalCost: order?.total_cost,
            commissionDispatch: order?.commission_rate_delivery,
            commissionItem: order?.commission_rate_item,
            orderStatus: order?.order_status,
            orderNumber: order?.order_number,
            paymentUrl: order?.payment_url,
            paymntStatus: order?.payment_status,
            vendorPhoneNumber: order?.vendor_phone_number,
            vendorUserName: order?.vendor_username,
            origin: order?.origin,
            destination: order?.destination,
            distance: order?.distance,
            orderOwnerPhoneNumber: order?.order_owner_phone_number,
            dispatchCompanyName: order?.dispatch_company_name,
            riderPhoneNumber: order?.rider_phone_number,
            plateNumber: order?.rider_bike_plate_number,
            riderImageUrl: order?.rider_image_url,
            riderName: order?.rider_name,
            dispatchCompanyPhoneNumber: order?.dispatch_company_phone_number,
            orderOwnerUsername: order?.order_owner_username,
            orderId: order?.id,
            deliveryFee: order?.delivery_fee,
            orderType: order?.order_type,
            destinationCoords: order?.destination_coords,
            originCoords: order?.origin_coords,
          },
        })
      }
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: activeColor.profileCard }]}
    >
      <View style={styles.topWrapper}>
        <View style={{ flex: 1.5 }}>
          <Text
            style={[
              styles.titleText,
              { color: activeColor.text, fontSize: 12 },

            ]}
          >
            {order.package_name || order.order_owner_username}
          </Text>
          <View style={styles.locationStyle}>
            <FontAwesome name="circle" color={activeColor.icon} size={15} />
            <Text style={[styles.textStyle, { color: activeColor.icon }]}>
              {order.origin}
            </Text>
          </View>
          <View style={styles.locationStyle}>
            <Ionicons
              name="location-outline"
              color={activeColor.icon}
              size={15}
            />
            <Text style={[styles.textStyle, { color: activeColor.icon }]}>
              {order.destination}
            </Text>
          </View>
        </View>
        {order?.order_type === "delivery" ? (
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Image
              source={order?.image_url}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
              style={styles.image}
            />
          </View>
        ) : order?.order_type === "food" ? (
          <View>
            <Image
              source={order?.foods[0].image_url}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
              style={styles.image}
            />
          </View>
        ) : (
          order?.order_type === "laundry" && (
            <View>
              <Image
                source={order?.laundries[0].image_url}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={styles.image}
              />
            </View>
          )
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ color: activeColor.text, fontFamily: "Poppins-Medium" }}>
          ₦ {order.total_cost}
        </Text>
        <Text style={[styles.textStyle, { color: activeColor.icon }]}>
          Dist: {order.distance} km
        </Text>
        <View style={styles.timeWrapper}>
          <Fontisto name="motorcycle" size={16} color={activeColor.icon} />

          <Text style={[styles.textStyle, { color: activeColor.icon }]}>
            {order.duration} mins
          </Text>
        </View>
        {!isHomeScreen ? (
          <Status
            text={order.order_status}
            textColor={
              order.order_status === "pending"
                ? "tomato"
                : order.order_status === "received"
                  ? "#25a18e"
                  : order.order_status === "delivered"
                    ? "skyblue"
                    : "#e8ac65"
            }
          />
        ) : (
          ""
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(OrderCard);

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    padding: 10,
    marginVertical: 3,
    borderRadius: 5,
    borderCurve: "continuous",
  },

  textStyle: {
    fontFamily: "Poppins-Light",
    fontSize: 12,
  },
  image: {
    height: 75,
    width: 95,
    borderRadius: 10,
  },

  topWrapper: {
    flexDirection: "row",
    // justifyContent: "space-between",

  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 10,
  },

  locationStyle: {
    flexDirection: "row",
    gap: 8,
  },

  timeWrapper: {
    flexDirection: "row",
    gap: 2,
    alignItems: "baseline",
  },
  titleText: {
    fontFamily: "Poppins-Regular",
  },
});
