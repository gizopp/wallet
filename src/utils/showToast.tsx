import Toast, { BaseToast } from "react-native-toast-message";
import { StyleSheet } from "react-native";
import theme from "../theme/theme";

interface ToastParams {
  title: string;
  message: string;
}

const CustomToast = () => {
  const toastConfig = {
    info: ({ text1, text2 }: any) => (
      <BaseToast
        style={{
          borderLeftColor: theme.colors.darkBlue,
          width: "90%",
          backgroundColor: "white",
        }}
        text1Style={styles.title}
        text2Style={styles.message}
        text1={text1}
        text2={text2}
        text2NumberOfLines={2}
      />
    ),
  };

  const styles = StyleSheet.create({
    title: {
      fontSize: 15,
      fontWeight: "600",
      color: "black",
    },
    message: {
      fontSize: 13,
      color: "#333",
    },
  });

  return <Toast config={toastConfig} />;
};

const showToast = ({ title, message }: ToastParams): void => {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 3000,
    topOffset: 60,
  });
};

export { CustomToast, showToast };
