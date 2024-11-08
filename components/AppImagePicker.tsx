import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/context/themeContext";

const AppImagePicker = ({
  imageUri,
  onChangeImage,
  borderRadius = 20,
  height = 75,
  width = 75,

}: {
  height?: number,
  width?: number | string,
  imageUri: string;
  borderRadius: number;
  onChangeImage: (url: string | null) => null | string;
}) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = Colors[theme.mode];

  useEffect(() => { requestPermission() }, [])

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted) alert('You need to enable permission to access the camera!')
  }

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert(
        "Delete Image",
        "Are you sure you want to delete this image?",
        [
          {
            text: "Yes",
            onPress: () => onChangeImage(""),
          },
          { text: "No" },
        ]
      );
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        onChangeImage(result.assets[0].uri);
      } catch (error) {
        throw new Error(error.message)
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.imageContainer,
          {
            backgroundColor: activeColor.inputBackground,
            borderColor: activeColor.borderColor,
            borderRadius,
            height,
            width
          },
        ]}
      >
        {!imageUri && (
          <Ionicons
            name="camera-outline"
            size={40}
            color={activeColor.tabIconDefault}
          />
        )}
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppImagePicker;

const styles = StyleSheet.create({
  imageContainer: {

    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    overflow: "hidden",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
