import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import { Colors } from "@/constants/Colors";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";
import Map from "@/components/Map";



const orderMap = () => {
  const params = useLocalSearchParams();
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];
  const { distance, cost, origin, destination } = params;

  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        title: '',
        headerStyle: {
          backgroundColor: 'transparent'
        }
      }}

      />
      <View style={styles.mapContainer}>
        <Map />
      </View>
      <View
        style={[
          styles.infoContainer
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={[styles.text, { color: activeColor.text }]}>
            {origin}
          </Text>
          <Text style={[styles.text, { color: activeColor.text }]}>
            {destination}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={[
              styles.textCard,
              {
                backgroundColor: activeColor.borderColor,
                color: activeColor.text,
              },
            ]}
          >
            {distance} km
          </Text>
          <Text
            style={[
              styles.textCard,
              {
                backgroundColor: activeColor.borderColor,
                color: activeColor.text,
              },
            ]}
          >
            ₦ {cost}
          </Text>
        </View>
      </View>
    </>
  );
};

export default orderMap;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 5,
  },
  infoContainer: {
    flex: 1,
    width: "95%",
    padding: 20,
    justifyContent: "center",
    alignSelf: 'center',
    position: 'absolute',
    bottom: 25,
    borderRadius: 10,
    backgroundColor: '#303339',
    opacity: 0.7


  },
  textCard: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  map: {
    flex: 1,
  },
});
