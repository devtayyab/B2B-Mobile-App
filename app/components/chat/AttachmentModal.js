import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import colors from "../../config/colors";
import CategoryPickerItem from "../CategoryPickerItem";
import Modal from "../Modal";

function AttachmentModal({ visible, setVisible, buttonsCallback }) {
  if (!visible) return null;
  const options = [
    {
      name: "document",
      backgroundColor: "#384B95",
      icon: "md-document",
      IconComponent: Ionicons,
      onPress: buttonsCallback.onDocument,
    },
    {
      name: "camera",
      backgroundColor: "#F6004A",
      icon: "camera",
      IconComponent: FontAwesome5,
      onPress: buttonsCallback.onCamera,
    },
    {
      name: "gallery",
      backgroundColor: "#983398",
      icon: "md-photos",
      IconComponent: Ionicons,
      onPress: buttonsCallback.onGallery,
    },
    {
      name: "audio",
      backgroundColor: "#EC8E12",
      icon: "headphones",
      IconComponent: MaterialCommunityIcons,
      onPress: buttonsCallback.onAudio,
    },
    {
      name: "location",
      backgroundColor: "#3F9E3F",
      icon: "location-on",
      IconComponent: MaterialIcons,
      onPress: buttonsCallback.onLocation,
    },
    {
      name: "contact",
      backgroundColor: "#41A1FF",
      icon: "person",
      IconComponent: MaterialIcons,
      onPress: buttonsCallback.onContact,
    },
  ];

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      MainComponent={() => (
        <View style={styles.container}>
          <FlatList
            data={options}
            keyExtractor={(option) => option.name}
            numColumns={3}
            renderItem={({ item }) => (
              <CategoryPickerItem
                item={item}
                onPress={() => {
                  setVisible(false);
                  item.onPress();
                }}
                iconSize={55}
                labelStyle={styles.label}
                iconSizeRatio={0.5}
              />
            )}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "white",
    height: 220,
    position: "absolute",
    borderRadius: 15,
    bottom: "17%",
  },
  label: {
    textAlign: "center",
    color: colors.medium,
    fontSize: 13,
  },
});

export default AttachmentModal;
