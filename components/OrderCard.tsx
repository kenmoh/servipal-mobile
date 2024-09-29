import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { Colors } from "@/constants/Colors";
import {
  FontAwesome,
  Fontisto,
  Ionicons,

} from "@expo/vector-icons";
import BouncyCheckBox from "react-native-bouncy-checkbox";
import { OrderResponseType } from "@/utils/types";
import { memo, useContext } from "react";
import { ThemeContext } from "@/context/themeContext";



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
      onPress={() => router.push({
        pathname: `(order)/${order?.id}`,
        params: {
          packageName: order?.package_name || order.order_owner_username,
          senderPhoneNumber: order?.order_owner_phone_number,
          imageUrl: order?.image_url || order?.foods[0].image_url || order?.laundries[0].image_url,
          itemCost: order?.item_cost,
          items: JSON.stringify(order?.foods) || JSON.stringify(order?.laundries),
          amountDueVendor: order?.amount_due_vendor,
          amountDueDispatch: order?.amount_due_dispatch,
          totalCost: order?.total_cost,
          commissionDispatch: order?.commission_rate_delivery,
          commissionItem: order?.commission_rate_item,
          orderStatus: order?.order_status,
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

        }
      })}
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: activeColor.profileCard }]}
    >
      <View style={styles.topWrapper}>
        <View>
          <Text style={[styles.titleText, { color: activeColor.text, fontSize: 12 }]}>
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
        <View>
          <Image
            source={order?.image_url || order.foods[0].image_url || order.laundries[0].image_url}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
            style={styles.image}
          />
        </View>
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
            45 mins
          </Text>
        </View>

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
    justifyContent: "space-between",
    gap: 10,
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: 'space-between',
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
