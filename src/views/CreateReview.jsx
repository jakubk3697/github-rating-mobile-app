import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#e1e4e8",
    borderRadius: 4,
  },
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "royalblue",
    padding: 10,
    marginHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "#d73a4a",
    marginBottom: 10,
    marginHorizontal: 12,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(1, "Rating must be at least 1")
    .max(100, "Rating cannot exceed 100")
    .required("Rating is required"),
  text: yup
    .string()
    .optional()
    .max(2000, "Review cannot exceed 2000 characters"),
});

export const CreateReviewContainer = ({ formik, showSuccess, error }) => {
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
        onChangeText={formik.handleChange("ownerName")}
        value={formik.values.ownerName}
        placeholder="Repository owner's username"
        testID="ownerName"
      />
      {handleError("ownerName")}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("repositoryName")}
        value={formik.values.repositoryName}
        placeholder="Repository name"
        testID="repositoryName"
      />
      {handleError("repositoryName")}
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange("rating")}
        value={formik.values.rating}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
        testID="rating"
      />
      {handleError("rating")}
      <TextInput
        style={[styles.input, { height: 100 }]}
        onChangeText={formik.handleChange("text")}
        value={formik.values.text}
        placeholder="Review"
        multiline
        testID="review"
      />
      {handleError("text")}
      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        testID="createReview"
      >
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
      {showSuccess && (
        <Text style={styles.alert}>
          Review created successfully! Redirecting...
        </Text>
      )}
      {error && <Text style={[styles.error, { marginTop: 10 }]}>{error}</Text>}
    </View>
  );
};

const CreateReviewForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState();
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      if (data?.createReview) {
        const pathFromID = data.createReview.repository.id;

        setShowSuccess(true);
        setError(null);
        setTimeout(() => {
          setShowSuccess(false);
          navigate(`/repository/${pathFromID}`);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      setError(e?.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
      setShowSuccess(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      repositoryName: "",
      ownerName: "",
      rating: "",
      text: "",
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <CreateReviewContainer
      formik={formik}
      showSuccess={showSuccess}
      error={error}
    />
  );
};

export default CreateReviewForm;
