import { TouchableOpacity, View, TextInput, Image, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import styles from "./search.style";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import SearchTile from "../components/products/SearchTile";
import { REACT_APP_END_POINT } from "@env";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `${REACT_APP_END_POINT}/api/products/search/${searchKey}`
      );
      console.log(data, "data");
      setSearchResult(data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons size={24} name="camera-outline" style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            placeholder="What are you looking for"
            onChangeText={setSearchKey}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Feather name="search" size={SIZES.xLarge} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      {!searchResult.length ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
