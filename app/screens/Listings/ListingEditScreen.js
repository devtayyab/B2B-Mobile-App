import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
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

import SelectList from "react-native-dropdown-select-list";



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
 

  const [gender, setGender] = useState("");
  const [quantity, setQuantity] = useState("");
  const [concentration, setConcentration] = useState("");

  const genderValue = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];
  const quantityValue = [
    { key: "1", value: "0/15ml" },
    { key: "2", value: "15/30ml" },
    { key: "3", value: "30/50ml" },
    { key: "4", value: "50/70ml" },
    { key: "5", value: "70/100ml" },
    { key: "6", value: "100/150ml" },
    { key: "7", value: "150/200ml" },
    { key: "8", value: "200ml" },
    { key: "9", value: "Other" },
  ];
  const concentrationValue = [
    { key: "1", value: "eau de cologne" },
    { key: "2", value: "eau de toilette" },
    { key: "3", value: "eau de parfume" },
    { key: "4", value: "Other" },
  ];
  



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
            gender: null,
            quantity: null,
            concentration:null,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView>
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />

          <SelectList
          
            setSelected={setGender}
            data={genderValue}
            placeholder="Choose Gender"
            search={false}
            name="gender"
            boxStyles={{ borderRadius: 20,
              borderColor: "#f8f4f4",
              backgroundColor: "#f8f4f4"}}
              inputStyles = {{color:"#6e6969", fontSize: 16, fontWeight: "800",}}
          />


          <FormField maxLength={255} name="brand" placeholder="Brand" />

          <SelectList
          
            setSelected={setQuantity}
            data={quantityValue}
            placeholder="Quantity"
            search={false}
            name="quantity"
            boxStyles={{ borderRadius: 20,
              borderColor: "#f8f4f4",
              backgroundColor: "#f8f4f4", marginTop:10,}}
              inputStyles = {{color:"#6e6969", fontSize: 16, fontWeight: "800",}}
          />


          <SelectList
          
          setSelected={setConcentration}
          data={concentrationValue}
          placeholder="Concentration"
          search={false}
          name="concentration"
          boxStyles={{ borderRadius: 20,
            borderColor: "#f8f4f4",
            backgroundColor: "#f8f4f4", marginTop:20, marginBottom:10,}}
            inputStyles = {{color:"#6e6969", fontSize: 16, fontWeight: "800",}}
        />






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
          </ScrollView>
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropDown: {
    borderRadius: 20,
    borderColor: "#f8f4f4",
    backgroundColor: "#f8f4f4",
    fontSize: 16,
    padding: 10,
    color: "#0c0c0c",
  },
});
export default ListingEditScreen;
