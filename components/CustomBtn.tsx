import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type CustomBtnProps = {
  btnBorderRadius: number;
  btnColor: string;
  label: string;
  btnHeight?: number;
  onPress?: () => void;
  disabled?: boolean
};


const CustomBtn = ({
  btnColor,
  label,
  btnBorderRadius = 50,
  btnHeight = 50,
  disabled = false,
  onPress = () => { },
  ...props
}: CustomBtnProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.btn,
        {
          borderRadius: btnBorderRadius,
          backgroundColor: btnColor,
          height: btnHeight,
        },
        { ...props },
      ]}
    >
      {disabled ? <ActivityIndicator size={30} color={'grey'} /> : <Text style={styles.text}>{label}</Text>}

    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    flexDirection: 'row',
    gap: 10, borderCurve: 'continuous'
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
});
