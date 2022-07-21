import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { useTheme } from "react-native-paper";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../components/forms";
import CategoryPickerItem from "../../components/CategoryPickerItem";
import Screen from "../../components/Screen";
import FormImagePicker from "../../components/forms/FormImagePicker";
import listingsApi from "../../api/listings";
import categoriesApi from "../../api/categories";
import locationHelper from "../../utility/location";
import UploadScreen from "../UploadScreen";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

import DropDownPicker from "react-native-dropdown-picker";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

function ListingEditScreen({ route }) {
  const listing = route && route.params ? route.params.listing : {};
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const getCategoriesApi = useApi(categoriesApi.getCategories);


  //Drop Down


  const [open, setOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
  ]);










  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const { latitude, longitude } = await locationHelper.getLocation();

    const newListing = { ...listing, location: { latitude, longitude } };
    delete newListing.category;
    newListing["categoryId"] = listing.category._id;

    const result = await listingsApi.addListing(newListing, (progress) =>
      setProgress(progress)
    );
    if (!result.ok) {
      console.log(result);
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };

  return (
    <>
      <ActivityIndicator visible={getCategoriesApi.loading} />
      <Screen style={styles.container}>
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />
        <Form
          initialValues={{
            title: listing.title ? listing.title : "",
            brand: listing.brand ? listing.brand : "",
            price: listing.price ? listing.price.toString() : "",
            description: listing.description ? listing.description : "",
            category: null,
            gender:null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />

          <DropDownPicker
            open={open}
            value={genderValue}
            items={gender}
            setOpen={setOpen}
            setValue={setGenderValue}
            setItems={setGender}
            placeholder="Choose Gender"
            name="gender"
            style={styles.dropDown}
          />
          <FormField maxLength={255} name="brand" placeholder="Brand" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
          />
          <Picker
            items={getCategoriesApi.data}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="100%"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropDown:{
    borderRadius: 20,
    borderColor: '#f8f4f4',
    backgroundColor: "#f8f4f4",
    fontSize: 16,
    padding: 10,
    color: "#0c0c0c"
  }
});
export default ListingEditScreen;
