import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBtn, Button } from "../components";
import styles from "./login.style";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_END_POINT } from "@env";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obscureText, setObscureText] = useState(false);

  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = `${REACT_APP_END_POINT}/api/login`;
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);
        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );
        await AsyncStorage.setItem("id", JSON.stringify(responseData._id));
        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert("Error Logging in", "Please provide valid credentials", [
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
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Oops, Error logging in. Try again with correct credentials ",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          {
            defaultIndex: 1,
          },
        ]
      );
    } finally {
      setLoader(false);
    }
  };

  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
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
    ]);
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.cover}
          />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
              touched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter email"
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => setFieldTouched("email", "")}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter password"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => setFieldTouched("password", "")}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      secureTextEntry={obscureText}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObscureText(!obscureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obscureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button
                  title={"L O G I N"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                  loader={loader}
                />
                <Text
                  style={styles.registration}
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
