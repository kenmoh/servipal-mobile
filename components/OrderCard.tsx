import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";

import { Colors } from "@/constants/Colors";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { ItemOrderType } from "@/utils/types";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Status from "./Status";
import HDivider from "./HDivider";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

dayjs.extend(relativeTime)

const OrderCard = ({ order, isHomeScreen, }: { order: ItemOrderType, isHomeScreen?: boolean }) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  return (
    <Link href={`(order)/${order?.id}`} asChild>
      <TouchableOpacity>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={[styles.container]}>
            <View style={{ flex: 1 }}>
              <Image
                source={order?.image_url}
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
                    fontSize: 13,
                    fontFamily: "Poppins-Light",
                    color: activeColor.text,
                  }}
                >
                  {order?.package_name}
                </Text>
                {!isHomeScreen && (<Status

                  text={order?.order_status!}

                  textColor={`${order?.order_status === "Pending"
                    ? "#c8553d"
                    : order?.order_status === "Received"
                      ? "#25a18e"
                      : order?.order_status === "Delivered"
                        ? "#27e"
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
                <Text style={[styles.textStyle, { color: activeColor.text, fontSize: 10 }]}>
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
                    pathname: "/(order)/payment",
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
                  {dayjs().to(dayjs(order?.created_at?.split('T')[0]))}
                </Text>
              </View>
            </View>
          </View>
          <HDivider />
        </View>

      </TouchableOpacity>
    </Link>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
    marginVertical: 5,
  },

  textStyle: {
    fontFamily: "Poppins-Light",
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 10,
  },
});
