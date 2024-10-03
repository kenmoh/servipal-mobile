import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useAuth } from "@/auth/authContext";
import { router } from "expo-router";
import {
    ActivityIndicator,
    Image,
    Platform,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContext";
import { Colors } from "@/constants/Colors";
import ProfileContainer from "@/components/ProfileContainer";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import client from "@/api/client";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { showMessage } from "react-native-flash-message";
import profileImage from "@/assets/images/profile.jpg"

type BackArrowType = {
    color: string;
    onPress: () => void;
};

const BackArrow = ({ color, onPress }: BackArrowType) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={10}
            onPress={onPress}
            style={{ marginLeft: 10 }}
        >
            {Platform.OS === "ios" ? (
                <Feather name="chevron-left" color={color} size={25} />
            ) : (
                <AntDesign name="arrowleft" color={color} size={25} />
            )}
        </TouchableOpacity>
    );
};

const CustomDrawerContent = (props: any) => {
    const { user, setUser } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    const [isEnabled, setIsEnabled] = useState(theme.mode === "dark");
    const [image, setImage] = useState<string | null>(null);

    const toggleSwitch = () => {
        toggleTheme({ newTheme: { mode: theme.mode } }),
            setIsEnabled((previousState) => !previousState);
    };

    const uploadMutation = useMutation({
        mutationFn: async (imageUri) => {
            const formData = new FormData();
            formData.append("image", {
                uri: imageUri,
                type: "image/jpeg",
                name: imageUri?.split("/").slice(-1)[0],
            });

            const response = await client.patch(
                "/users/update-profile-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(response.data?.detail);
            }
            return response.data;
        },
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadMutation.mutate(result?.assets[0]?.uri, {
                onError: () =>
                    showMessage({
                        message: error.message || "Something went wrong!",
                        type: "danger",
                        style: {
                            alignItems: "center",
                        },
                    }),
                onSuccess: (data) => {
                    setImage(data?.profile_image);
                    showMessage({
                        message: "Image uploaded!",
                        type: "success",
                        style: {
                            alignItems: "center",
                        },
                    });
                },
            });
        }
    };

    return (
        <>
            <DrawerContentScrollView
                style={{ backgroundColor: activeColor.background }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 15,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: activeColor.icon,

                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{ width: 80, height: 80, borderRadius: 100 }}
                        >
                            {uploadMutation.isPending && (
                                <ActivityIndicator
                                    color={activeColor.icon}
                                    style={{
                                        position: "absolute",
                                        top: 30,
                                        left: 30,
                                        zIndex: 999,
                                    }}
                                />
                            )}
                            {user?.profile_image ? (
                                <Image
                                    source={{ uri: user?.profile_image ? user.photo_url : image! }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 100,
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <Image
                                    source={profileImage}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: 100,
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                        <View >
                            <Text
                                style={[
                                    styles.profileText,
                                    { color: activeColor.text, fontSize: 15 },
                                ]}
                            >
                                {user?.full_name || user?.username || user?.company_name}
                            </Text>
                            <Text style={[styles.profileText, { color: activeColor.icon }]}>
                                {user?.phone_number}
                            </Text>
                            <Text style={[styles.profileText, { color: activeColor.icon }]}>
                                {user?.email}
                            </Text>
                        </View>
                    </View>
                    {user?.user_type === 'Regular User' && <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('(drawer)/me')}>
                        <Feather name="edit" color={activeColor.icon} size={18} />
                    </TouchableOpacity>}
                </View>
                {user?.user_type === 'Restaurant Service Provider' || user?.user_type === 'Laundry Service Provider' ? (

                    <DrawerItem
                        label={"Store"}
                        onPress={() => router.push({
                            pathname: `(restaurant)/${user?.id}`,
                            params: {
                                id: user.id,
                            },
                        })}
                        labelStyle={[styles.text, { color: activeColor.text }]}
                        icon={() => (
                            <Feather name="shopping-bag" color={activeColor.text} size={20} />
                        )}
                    />
                ) : ''}
                {user?.user_type === 'Dispatch Provider' || user?.user_type === 'Restaurant Service Provider' || user?.user_type === 'Laundry Service Provider' ? (

                    <DrawerItem
                        label={"Profile"}
                        onPress={() => router.push("setupCompanyProfile")}
                        labelStyle={[styles.text, { color: activeColor.text }]}
                        icon={() => (
                            <Feather name="user" color={activeColor.text} size={20} />
                        )}
                    />
                ) : ''}
                {user?.user_type === "Dispatch Provider" && (
                    <>
                        <DrawerItem
                            label={"Add Rider"}
                            onPress={() => router.push("addRider")}
                            labelStyle={[styles.text, { color: activeColor.text }]}
                            icon={() => (
                                <Feather name="user" color={activeColor.text} size={20} />
                            )}
                        />
                        <DrawerItem
                            label={"Manage Riders"}
                            onPress={() => router.push("riders")}
                            labelStyle={[styles.text, { color: activeColor.text }]}
                            icon={() => (
                                <Feather name="users" color={activeColor.text} size={20} />
                            )}
                        />
                    </>
                )}

                <DrawerItem
                    label={"Change Password"}
                    onPress={() => router.push("changePassword")}
                    labelStyle={[styles.text, { color: activeColor.text }]}
                    icon={() => (
                        <Feather name="lock" color={activeColor.text} size={20} />
                    )}
                />
                <DrawerItem
                    labelStyle={[styles.text, { color: activeColor.text }]}
                    label={"Support"}
                    onPress={() => router.push("support")}
                    icon={() => (
                        <MaterialIcons
                            name="support-agent"
                            size={20}
                            color={activeColor.text}
                        />
                    )}
                />

                <View style={{ paddingHorizontal: 5 }}>
                    <ProfileContainer>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: activeColor.text,
                                    fontFamily: "Poppins-Light",
                                    fontSize: 14,
                                }}
                            >
                                Dark Mode
                            </Text>
                            <Switch
                                thumbColor={isEnabled ? "teal" : activeColor.icon}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </ProfileContainer>
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    paddingHorizontal: 5,
                    backgroundColor: activeColor.background,
                }}
            >
                <ProfileContainer>
                    <View
                        style={{
                            bottom: 0,
                            left: 0,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setUser(null)}
                            style={styles.accountContainer}
                        >
                            <Feather name="log-out" color={Colors.error} size={18} />
                            <Text style={{ color: Colors.error }}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => console.log("Account Deleted!")}
                            style={styles.accountContainer}
                        >
                            <Feather name="trash-2" color={Colors.error} size={18} />
                            <Text style={{ color: Colors.error }}>Delete Accout</Text>
                        </TouchableOpacity>
                    </View>
                </ProfileContainer>
            </View>
        </>
    );
};

const DrawerLayout = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    let activeColor = Colors[theme.mode];
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShadowVisible: false,
                headerTintColor: activeColor.text,
                headerStyle: {
                    backgroundColor: activeColor.background,
                },
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen
                name="me"
                options={{
                    title: 'Update Profile',
                }}
            />


            <Drawer.Screen
                name="addRider"
                options={{
                    title: "Add Rider",
                    headerLeft: () => (
                        <BackArrow onPress={router.back} color={activeColor.text} />
                    ),
                }}
            />
            <Drawer.Screen
                name="changePassword"
                options={{
                    title: "Change Password",
                    headerLeft: () => (
                        <BackArrow onPress={router.back} color={activeColor.text} />
                    ),
                }}
            />
            <Drawer.Screen
                name="riders"
                options={{
                    title: "Manage Riders",
                    headerLeft: () => (
                        <BackArrow onPress={router.back} color={activeColor.text} />
                    ),
                }}
            />
            <Drawer.Screen
                name="support"
                options={{
                    title: "Support",
                    headerLeft: () => (
                        <BackArrow onPress={router.back} color={activeColor.text} />
                    ),
                }}
            />
        </Drawer>
    );
};

export default DrawerLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    accountContainer: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    text: { fontFamily: "Poppins-Bold", fontSize: 16, marginLeft: -15 },
    profileText: {
        fontFamily: "Poppins-Light",
        fontSize: 12,
    },
});
