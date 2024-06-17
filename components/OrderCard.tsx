import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import dayjs from "dayjs";

import { Colors, themeMode } from "@/constants/Colors";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { OrderType } from "@/utils/types";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Status from "./Status";
import HDivider from "./HDivider";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const OrderCard = ({ order, isHomeScreen }: { order: OrderType, isHomeScreen?: boolean }) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <Link href={`(orderDetail)/${order?.id}`} asChild>
      <TouchableOpacity>
        <View style={[styles.container]}>
          <View style={{ flex: 1 }}>
            <Image
              source={order?.order_photo_url}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
              style={styles.image}
            />
          </View>

          <View style={{ flex: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Light",
                  color: activeColor.text,
                }}
              >
                {order?.name}
              </Text>
              {!isHomeScreen && (<Status

                text={order?.order_status!}
                backgroundColor={`${order?.order_status === "Received"
                  ? "success"
                  : order?.order_status === "Picked up"
                    ? Colors.pickUpColor
                    : order?.order_status === "Delivered"
                      ? Colors.delivered
                      : Colors.pendingColor
                  }`}
                textColor={`${order?.order_status === "Pending"
                  ? "#c8553d"
                  : order?.order_status === "Received"
                    ? "#25a18e"
                    : order?.order_status === "Delivered"
                      ? "#27187e"
                      : "#e8ac65"
                  }`} />)}


            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 7.5 }}
            >
              <MaterialIcons
                name="trip-origin"
                size={15}
                color={activeColor.icon}
              />
              <Text style={[styles.textStyle, { color: activeColor.text, fontSize: 12 }]}>
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
              <Text style={[styles.textStyle, { color: activeColor.text, fontSize: 12 }]}>
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
                    fontWeight: "bold",
                    fontSize: 16,
                    fontFamily: "Poppins-Regular",
                    letterSpacing: 1.4,
                    color: activeColor.text,
                  }}
                >
                  {order?.total_cost}
                </Text>
              </View>
              {order?.payment_status != 'paid' &&
                <TouchableOpacity onPress={() => router.push({
                  pathname: "/order/payment",
                  params: { paymentUrl: order?.payment_url, id: order?.id, totalCost: order?.total_cost },
                })}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-SemiBold",
                      color: Colors.btnPrimaryColor,
                    }}
                  >
                    PAY
                  </Text>
                </TouchableOpacity>
              }
              <Text
                style={{
                  color: activeColor.icon, fontSize: 12,
                  fontFamily: "Poppins-Light",
                }}
              >
                {order?.created_at}
              </Text>
            </View>
          </View>
        </View>
        <HDivider />

      </TouchableOpacity>
    </Link>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
    marginVertical: 5,
  },

  textStyle: {
    fontFamily: "Poppins-Regular",

  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 10,
  },
});
