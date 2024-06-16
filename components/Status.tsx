import { StyleSheet, Text, View } from "react-native";

type StatusProps = {
  text: string;
  textColor: string;
  backgroundColor: string;
};

const Status = ({
  backgroundColor,

  textColor,
  text,
}: StatusProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,


        },
      ]}
    >
      <Text style={{ color: textColor, textTransform: "capitalize" }}>
        {text}
      </Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
});
