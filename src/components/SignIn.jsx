import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Text from "./Text";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        navigate("/repositories/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert, navigate]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 15,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: (isBothFilled) => ({
      alignItems: "center",
      backgroundColor: isBothFilled ? "royalblue" : "#DDDDDD",
      padding: 10,
      marginHorizontal: 12,
      borderRadius: 4,
    }),
    error: {
      color: "#d73a4a",
      marginBottom: 10,
      marginHorizontal: 12,
    },
    alert: {
      color: "green",
      textAlign: "center",
      margin: 12,
    },
  });

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setShowAlert(true);
      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const isBothFilled = formik.values.username && formik.values.password;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        placeholder="Username"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={styles.button(isBothFilled)}
        onPress={formik.handleSubmit}
      >
        <Text>Sign in</Text>
      </Pressable>
      {showAlert && (
        <Text style={styles.alert}>Sign in successful! Redirecting...</Text>
      )}
    </View>
  );
};

export default SignIn;
