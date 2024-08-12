import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { Colors } from "@/constants/Colors";
import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ItemOrderType } from "@/utils/types";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Status from "./Status";
import HDivider from "./HDivider";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

dayjs.extend(relativeTime);

const OrderCard = ({
  order,
  isHomeScreen,
  image,
}: {
  order: ItemOrderType;
  isHomeScreen?: boolean;
  image?: string;
}) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  return (
    // <Link href={`(order)/${order?.id}`} asChild>
    <TouchableOpacity
      onPress={() => router.push(`(order)/${order?.id}`)}
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: activeColor.profileCard }]}
    >
      <View style={styles.topWrapper}>
        <View>
          <Text style={[styles.titleText, { color: activeColor.text, fontSize: 12 }]}>
            {order.package_name}
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
            source={image ? image : order?.image_url}
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
                  ? "#27e"
                  : "#e8ac65"
              }`}
          />
        )}
      </View>

      {/* <View style={{ paddingHorizontal: 20 }}>
          <View style={[styles.container]}>
            <View style={{ flex: 1 }}>
              <Image
                source={image ? image : order?.image_url}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                style={styles.image}
              />
            </View>

            <View style={{ flex: 4 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Poppins-Light",
                    color: activeColor.text,
                  }}
                >
                  {order?.package_name}
                </Text>
                {!isHomeScreen && (
                  <Status
                    text={order?.order_status!}
                    textColor={`${order?.order_status === "Pending"
                      ? "#c8553d"
                      : order?.order_status === "Received"
                        ? "#25a18e"
                        : order?.order_status === "Delivered"
                          ? "#27e"
                          : "#e8ac65"
                      }`}
                  />
                )}
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 7.5 }}
              >
                <MaterialIcons
                  name="trip-origin"
                  size={15}
                  color={activeColor.icon}
                />
                <Text
                  style={[
                    styles.textStyle,
                    { color: activeColor.text, fontSize: 10 },
                  ]}
                >
                  {order?.origin}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7.5,
                }}
              >
                <EvilIcons name="location" size={15} color={activeColor.icon} />
                <Text
                  style={[
                    styles.textStyle,
                    { color: activeColor.text, fontSize: 12 },
                  ]}
                >
                  {order?.destination}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginTop: 5,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text style={{ color: activeColor.text }}> ₦ </Text>
                  <Text
                    style={{

                      fontSize: 12,
                      fontFamily: "Poppins-Bold",
                      color: activeColor.text,
                    }}
                  >
                    {order?.total_cost}
                  </Text>
                </View>
                {order?.payment_status != "paid" && (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/(order)/payment",
                        params: {
                          paymentUrl: order?.payment_url,
                          id: order?.id,
                          totalCost: order?.total_cost,
                        },
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: "Poppins-Light",
                        color: Colors.btnPrimaryColor,
                      }}
                    >
                      PAY
                    </Text>
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    color: activeColor.icon,
                    fontSize: 12,
                    fontFamily: "Poppins-Light",
                  }}
                >
                  {dayjs().to(dayjs(order?.created_at?.split("T")[0]))}
                </Text>
              </View>
            </View>
          </View>
          <HDivider />
        </View> */}
    </TouchableOpacity>
    // </Link>
  );
};

export default OrderCard;

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
