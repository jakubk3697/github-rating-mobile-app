import React, { useState, useEffect } from "react";
import * as yup from "yup";
import Text from "../components/Text";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

export const SignInContainer = ({
  formik,
  isBothFilled,
  showSuccess,
  error,
}) => {
  const handleError = (field) => {
    if (formik.touched[field] && formik.errors[field]) {
      return <Text style={styles.error}>{formik.errors[field]}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
        placeholder="Username"
        testID="username"
      />
      {handleError("username")}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
        testID="password"
      />
      {handleError("password")}
      <Pressable
        style={styles.button(isBothFilled)}
        onPress={formik.handleSubmit}
        testID="signIn"
      >
        <Text>Sign in</Text>
      </Pressable>
      {showSuccess && (
        <Text style={styles.alert}>Sign in successful! Redirecting...</Text>
      )}
      {error && <Text style={[styles.error, { marginTop: 10 }]}>{error}</Text>}
    </View>
  );
};

const SignIn = () => {
  const [showSuccess, setshowSuccess] = useState(false);
  const [error, setError] = useState();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setshowSuccess(false);
        navigate("/repositories/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      if (data?.authenticate?.accessToken) {
        setshowSuccess(true);
        setError(null);
      }
    } catch (e) {
      console.log(e);
      setError(e?.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
      setshowSuccess(false);
    }
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
    validateOnChange: false,
    validateOnBlur: false,
  });

  const isBothFilled = formik.values.username && formik.values.password;

  return (
    <SignInContainer
      onSubmit={onSubmit}
      formik={formik}
      showSuccess={showSuccess}
      error={error}
      isBothFilled={isBothFilled}
    />
  );
};

export default SignIn;
