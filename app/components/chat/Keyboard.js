import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Text from "../Text";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Recorder from "./Recorder";
import AttachmentModal from "./AttachmentModal";

const initHeight = 45;

function Keyboard({
  sendMessage,
  sendRecording,
  onPressCamera,
  buttonsCallback,
}) {
  const { colors } = useTheme();
  const [draftMessage, setDraftMessage] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

  const onSendTextMessage = () => {
    sendMessage(draftMessage);
    setDraftMessage("");
  };

  const dispalyRecordTime = () =>
    `${String(Math.round(recordingTime / 60)).padStart(2, "0")}:${String(
      Math.round(recordingTime % 60)
    ).padStart(2, "0")}`;

  return (
    <>
      <AttachmentModal
        visible={visible}
        setVisible={setVisible}
        buttonsCallback={buttonsCallback}
      />

      <View style={styles.allKeyboard}>
        <View style={[styles.keyboard, { height: initHeight }]}>
          <View style={{ paddingRight: 10 }}>
            <TouchableOpacity>
              <MaterialIcons
                name="insert-emoticon"
                color={colors.medium}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, paddingRight: 10 }}>
            {recordingTime !== 0 ? (
              <View style={{ alignItems: "flex-end", padding: 3 }}>
                <Text style={{ color: colors.medium }}>
                  {dispalyRecordTime()}
                </Text>
              </View>
            ) : (
              <TextInput
                placeholder={t("keyboardPlaceholder")}
                placeholderTextColor={colors.medium}
                onChangeText={(text) => setDraftMessage(text)}
                value={draftMessage}
                selectionColor={colors.primary}
                multiline
                numberOfLines={10}
                style={{ maxHeight: 5 * initHeight, fontSize: 15 }}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <Entypo name="attachment" size={24} color={colors.medium} />
          </TouchableOpacity>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <TouchableOpacity onPress={onPressCamera}>
              <FontAwesome name="camera" size={24} color={colors.medium} />
            </TouchableOpacity>
          </View>
        </View>
        {draftMessage.length > 0 ? (
          <TouchableOpacity onPress={onSendTextMessage}>
            <View
              style={[styles.micophone, { backgroundColor: colors.primary }]}
            >
              <MaterialCommunityIcons name="send" size={24} color="white" />
            </View>
          </TouchableOpacity>
        ) : (
          <Recorder
            setRecordingTime={setRecordingTime}
            sendRecording={sendRecording}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "80%",
    borderRadius: 40,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 5,
  },
  allKeyboard: {
    paddingLeft: 10,
    flexDirection: "row",
    paddingTop: 15,
  },
  recordingTime: {},
  micophone: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default Keyboard;
