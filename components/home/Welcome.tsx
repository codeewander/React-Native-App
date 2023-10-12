import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText(COLORS.black, SIZES.xSmall)}>
          Find the Most
        </Text>
        <Text style={styles.welcomeText(COLORS.primary, 0)}>
          Luxurious Furniture
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather size={24} name="search" style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            placeholder="What are you looking for"
            onPressIn={() => navigation.navigate("Search")}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
