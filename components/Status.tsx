import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type StatusProps = {
  text: string;
  textColor: string;
  backgroundColor?: string;
  onPress?: () => void
};

const Status = ({
  backgroundColor,
  textColor,
  text,
  onPress
}: StatusProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor,


        },
      ]}
    >
      <Text style={{
        color: textColor, textTransform: "capitalize", fontFamily: 'Poppins-Light',
        fontSize: 12
      }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Status;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
    paddingHorizontal: 10,
    paddingVertical: 2,

  },
});
