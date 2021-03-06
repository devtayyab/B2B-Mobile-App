import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  iconSizeRatio = 0.6,
  IconComponent = MaterialCommunityIcons,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconComponent
        name={name}
        color={iconColor}
        size={size * iconSizeRatio}
      />
    </View>
  );
}

export default Icon;
