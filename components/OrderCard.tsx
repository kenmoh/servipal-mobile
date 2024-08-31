import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { Colors } from "@/constants/Colors";
import {
  FontAwesome,
  Fontisto,
  Ionicons,

} from "@expo/vector-icons";
import { ItemOrderType } from "@/utils/types";
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
  order: ItemOrderType;
  isHomeScreen?: boolean;
}) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  return (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: `(order)/${order?.id}`,
        params: { orderType: order.order_type }
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
            source={order?.image_url || order.foods[0].image_url}
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
        {isHomeScreen ? (
          <Text style={[styles.textStyle, { color: activeColor.icon }]}>
            | {dayjs().to(dayjs(order?.created_at?.split("T")[0]))}
          </Text>
        ) : (
          <Status
            text={order?.order_status!}
            textColor={`${order?.order_status === "Pending"
              ? "#f56991"
              : order?.order_status === "Received"
                ? "#25a18e"
                : order?.order_status === "Delivered"
                  ? "#3bade2"
                  : "#e8ac65"
              }`}
          />
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
    justifyContent: "space-between",
    gap: 10,
  },

  bottomContainer: {
    flexDirection: "row",
    alignItems: "baseline",
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
