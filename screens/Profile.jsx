import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./profile.style";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const useId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(useId);
      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const useId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([useId, "id"]);
      navigation.replace("Bottom Navigation");
    } catch (error) {
      console.log("Error logging out the user", error);
    }
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel");
        },
      },
      {
        text: "Continue",
        onPress: () => userLogout(),
      },
      {
        defaultIndex: 1,
      },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancel");
          },
        },
        {
          text: "Continue",
          onPress: () => {
            console.log("continue");
          },
        },
        {
          defaultIndex: 1,
        },
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete account", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel");
        },
      },
      {
        text: "Delete",
        onPress: () => {
          console.log("delete account");
        },
      },
      {
        defaultIndex: 1,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin ? "Kira" : "Please login into your account"}
          </Text>
          {!userLogin ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View style={styles.loginBtn}>
                <Text style={styles.loginText}>L O G I N</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <View style={styles.loginBtn}>
                <Text style={styles.loginText}>test@gmail.com</Text>
              </View>
            </TouchableOpacity>
          )}
          {!userLogin ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
              >
                <View style={styles.menuItem(0.5)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View style={styles.menuItem(0.5)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.menuItem(0.5)}>
                  <SimpleLineIcons
                    name="bag"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={clearCache}>
                <View style={styles.menuItem(0.5)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.menuItem(0.5)}>
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <View style={styles.menuItem(0.5)}>
                  <AntDesign name="logout" size={24} color={COLORS.primary} />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;
