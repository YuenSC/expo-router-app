import { makeStyles, Text } from "@rneui/themed";
import React from "react";
import { Pressable, View } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";

// BaseToast styles
const WIDTH = "100%";
const BORDER_RADIUS = 5;

const CustomBaseToast = ({ text1, text2, onPress }: ToastConfigParams<any>) => {
  const styles = useStyles();
  return (
    <View style={{ flex: 1, marginHorizontal: 16 }}>
      <Pressable onPress={onPress} style={[styles.base, styles.leadingBorder]}>
        <View style={styles.contentContainer}>
          <Text style={styles.text1}>{text1}</Text>
          <Text style={styles.text2} numberOfLines={6}>
            {text2}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  base: {
    flexDirection: "row",
    width: WIDTH,
    borderRadius: BORDER_RADIUS,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: BORDER_RADIUS,
    elevation: 2,
    backgroundColor: "#FFF",
    paddingVertical: 10,
  },
  leadingBorder: {
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.error,
  },
  contentContainer: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text1: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#000",
    width: "100%",
  },
  text2: {
    fontSize: 14,
    color: "#979797",
    flexShrink: 1,
  },
}));

export const toastConfig = {
  error: (props: ToastConfigParams<any>) => <CustomBaseToast {...props} />,
};
