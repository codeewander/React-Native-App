import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import styles from "./search.style";

const Search = () => {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons size={24} name="camera-outline" style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            placeholder="What are you looking for"
            onPressIn={() => {}}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={SIZES.xLarge} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
